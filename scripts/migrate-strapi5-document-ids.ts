import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { FicheType } from "@/src/generated/prisma/client";

/**
 * One-shot data backfill for the Strapi v4 -> v5 migration.
 *
 * Context: prisma/schema.prisma columns that used to store Strapi's numeric `id` for
 * FicheSolution/FicheDiagnostic/Materiau/RetourExperience have been converted to String
 * (they now store the v5 `documentId`). That schema/type migration is handled separately
 * (Prisma migration file). This script only rewrites the *data*: every existing row still
 * holds the old numeric id (stringified by the column type change), which this script
 * replaces with the corresponding documentId using the correspondence tables the user
 * exported from the CMS migration.
 *
 * Run AFTER the Prisma migration (Int -> String columns) has been applied, and BEFORE
 * relying on any Strapi v5 documentId-based query against this data.
 *
 * Usage:
 *   npx tsx ./scripts/migrate-strapi5-document-ids.ts          # dry-run, logs only
 *   npx tsx ./scripts/migrate-strapi5-document-ids.ts --apply  # writes changes
 */

const DRY_RUN = !process.argv.includes("--apply");

// Correspondence tables: ancien id numérique Strapi v4 -> nouveau documentId Strapi v5

const FICHE_DIAGNOSTIC_ID_MAP: Record<number, string> = {
  8: "zcw5r7g8gy7e4j23mc4b2xdn",
  6: "vvqts3diu4255f087r4rnnqj",
  7: "qps271nylcj8b03qddeoy0jm",
  4: "nbrefb706emalz0b5zmqx9b3",
  5: "r6btvkx4zsdqx6q30wmqg3g0",
  10: "szwr7tvej6zgtfbwqn9mggdn",
  2: "y12xz54ibwn80edw5ylneaos",
  9: "x1oocoj5rx0kdong9cfizhtm",
  11: "xeonpfyf3788ny7dzl2bj35z",
  44: "zcw5r7g8gy7e4j23mc4b2xdn",
  1: "jzv5y6rw7dn87mneieyu8rzn",
  45: "j8a3794vju95jyo8qgng3lis",
  46: "vvqts3diu4255f087r4rnnqj",
  47: "qps271nylcj8b03qddeoy0jm",
  48: "nbrefb706emalz0b5zmqx9b3",
  49: "r6btvkx4zsdqx6q30wmqg3g0",
  50: "szwr7tvej6zgtfbwqn9mggdn",
  51: "y12xz54ibwn80edw5ylneaos",
  52: "x1oocoj5rx0kdong9cfizhtm",
  53: "xeonpfyf3788ny7dzl2bj35z",
  54: "zcw5r7g8gy7e4j23mc4b2xdn",
  55: "jzv5y6rw7dn87mneieyu8rzn",
};

const FICHE_SOLUTION_ID_MAP: Record<number, string> = {
  38: "w3yf69aosbacbcnmlr3lsdyv",
  13: "egb6wqayklg4e1scpztapktr",
  33: "z55582w9zgw4rpjc8hwq1ahr",
  14: "xwwvc38hau4mbea0p6z6zl95",
  17: "qprxey047lpm7ap4hw6awd3k",
  32: "cgnks1bmw72pz22fbrlpkdiy",
  23: "kyovnqgh11fhugsowuoczxjk",
  35: "lhbedype87rxeinxnpw8ngbz",
  15: "dwtekhux1g0s0vqos835iayx",
  31: "ypw9equlnfnq4bvjlcqoiah8",
  21: "oto7gkroxgxdoatjs3vr83k8",
  19: "s2z8cxqjlaji2wbvog53n84r",
  20: "a3xl6uhoh76m6qoo99qnf7or",
  34: "yl4j1dpz7uvtt73mtb63bko1",
  30: "e8r6ouxh0cx5ubf5eyu8y9ko",
  25: "dz3vthux10um9ox2ofe3ik5q",
  18: "pvo8vi5venox3aq3rn62eozi",
  28: "omhz1uimu1yxv1uy82hinhvr",
  16: "fw2enlgdh0hn2xlthq4jidn6",
  41: "kb1rgeihnl2z89zt7fmi2dg5",
  22: "igjx5hdf2vwqt2bsog6zldvu",
  29: "cthbv8wob1bwod3rjj0nmcjr",
  40: "lp5hkxfs9cajcqkccwq6lxtx",
  10: "tk3ebn98dlzs9eb6j889ovu8",
  24: "qf7xrnbhyu7ovwdz8mi7qp35",
  11: "r1tfru0fai6k4rsapi74t0o2",
  12: "omsiufxlq66h7d02nluk30fm",
  27: "shzkcb5skruazhhl1wexvz4m",
  39: "mzd50svyh0qbzyi3uiml71uh",
  74: "lfpe2dunxnztwhurqrxtcac3",
  26: "nq3f5nm0vrk6fgan270pj138",
  37: "ansp7qzxx8qzggap0wl2tl98",
  36: "ay3qwyt8xd4iapvf7sahvolo",
  75: "w3yf69aosbacbcnmlr3lsdyv",
  76: "egb6wqayklg4e1scpztapktr",
  85: "oto7gkroxgxdoatjs3vr83k8",
  77: "z55582w9zgw4rpjc8hwq1ahr",
  78: "xwwvc38hau4mbea0p6z6zl95",
  79: "qprxey047lpm7ap4hw6awd3k",
  80: "cgnks1bmw72pz22fbrlpkdiy",
  81: "kyovnqgh11fhugsowuoczxjk",
  82: "lhbedype87rxeinxnpw8ngbz",
  83: "dwtekhux1g0s0vqos835iayx",
  84: "ypw9equlnfnq4bvjlcqoiah8",
  86: "a3xl6uhoh76m6qoo99qnf7or",
  87: "yl4j1dpz7uvtt73mtb63bko1",
  88: "e8r6ouxh0cx5ubf5eyu8y9ko",
  89: "dz3vthux10um9ox2ofe3ik5q",
  90: "pvo8vi5venox3aq3rn62eozi",
  91: "omhz1uimu1yxv1uy82hinhvr",
  92: "fw2enlgdh0hn2xlthq4jidn6",
  93: "kb1rgeihnl2z89zt7fmi2dg5",
  94: "igjx5hdf2vwqt2bsog6zldvu",
  95: "cthbv8wob1bwod3rjj0nmcjr",
  96: "lp5hkxfs9cajcqkccwq6lxtx",
  97: "tk3ebn98dlzs9eb6j889ovu8",
  98: "qf7xrnbhyu7ovwdz8mi7qp35",
  99: "r1tfru0fai6k4rsapi74t0o2",
  100: "omsiufxlq66h7d02nluk30fm",
  101: "shzkcb5skruazhhl1wexvz4m",
  102: "mzd50svyh0qbzyi3uiml71uh",
  103: "lfpe2dunxnztwhurqrxtcac3",
  104: "nq3f5nm0vrk6fgan270pj138",
  105: "ansp7qzxx8qzggap0wl2tl98",
  106: "ay3qwyt8xd4iapvf7sahvolo",
};

const MATERIAU_ID_MAP: Record<number, string> = {
  14: "ni16glpne42tw4xzdreyref6",
  33: "ylrb1h4e5mksakwo0osxjc2e",
  58: "pig19xkt0ztda30vohng2z1o",
  79: "aysnf9hiwsxw4o0rcqfzovhz",
  80: "bttlw4wl7t3yhakhajuflkmr",
  38: "grsqarnzyjxbp96tjiw2q6oy",
  64: "chp4itmw6wnuqot6jgg5lyi4",
  127: "t5hmo8bbepivpxjmxrw1kqgz",
  4: "lqcx1eewjo4rgf99tgf7b078",
  128: "c5wkyiofssbbrlfhhljwy74g",
  115: "id8mzt4c2sxp6lju327wby0e",
  163: "f0bxdkznjxtnigyushgn0xbz",
  124: "qis82l47plm11lxntxdsresa",
  165: "oejt0s7jtd4jjdt205iphmyk",
  164: "mgja7loa6pnfja3bq7ag0kbw",
  116: "vo2fxozjw1ti3xvk854k0bus",
  118: "yxt3f6m9k7na2j51q481pxm2",
  129: "hvqk6dodlwcim4pbhpfrxoba",
  117: "gu4i7ztbozraegazl792g5do",
  130: "qcyewev53efspi5dlif379k4",
  114: "u4fffxwh78109mzqjo0pzeaj",
  18: "wuhtz5qec8tvh689umsxgdp6",
  41: "r5hwl9lk7bzjsc69fe4ejh8g",
  108: "ns1j92d7e5ony0jf9suuqs8c",
  5: "f4xmx253qf3ro6fcbq0zvrhg",
  6: "z1dbf13kffau1x1ush0y8cxu",
  7: "on05rwx43907kuxg1k7aqct7",
  8: "r42l0k1v2sdy3wyg6l07c93h",
  9: "irtyfp6hqc3x31dizcux092i",
  10: "k0nlg6ep7tx6wvoxoeosnpaf",
  11: "mavum96gifx0ka0x0nuujlgx",
  12: "tgoijarx7ascpqy67q4ksxpn",
  13: "bx07i69sdkayagv83px55zvi",
  15: "r41n8n6kce6w12qd6l7v6la1",
  16: "ot2ab95ppmh140zx7putvkmn",
  17: "xubgn3rm3lfawsys3h4fm6cy",
  19: "ah8hr5k58toxm1w0fnrb21yg",
  20: "kou6s87cs6quh4dpj7m5ttu8",
  21: "oddp1m8a0pgcin4t0sdkda3c",
  22: "ibgvf5xtzmjazgeixoa733jt",
  23: "nvlsutg66e065dpyfzayd87u",
  24: "a9ka471xd1ec32eraf5thhbt",
  43: "vvjplccn3eq5gcpo7wrveqq9",
  26: "fz4vdemh9q4utir4biyw1i0w",
  25: "n8a9rrbzqbo7t0c2nu6vycop",
  27: "fxia190gdd9azauin3b8k89k",
  28: "xmxbp3y0qg67ct4c3qpdnqid",
  42: "yqy5jyx2pgdvt8snlte0281b",
  29: "a71frv0i088yrku8f3yc22g5",
  30: "k4a1ab9jnr9h70yj7sd5jj75",
  31: "vk2mjdrgdgo3zkk63rniu378",
  32: "oufgf92d7qyszdskcbr7kruw",
  34: "kin092jlb3s7xjuvju2gyoia",
  35: "pyvua57uucqxe1ck44a36nby",
  36: "pc22zxb16kluw2jam2rm74uf",
  37: "ylwd16cudpdil26q2zs4b9gl",
  39: "op1pl4664thhjvb4tk02yafz",
  40: "gdhzp5uf1yf981iqklqnxqa2",
  44: "te6rv38fp5mxid1309olu9pz",
  45: "szdr1yqq0l11ap1glgpekd92",
  46: "hk6dxmwayoxp1gi33jzqww1t",
  57: "yzucwrf2o44ba77dqtmhswe6",
  47: "wht96xrlcgwg7qk325d7ybzi",
  48: "ri5jgldzm099dcpvtxw2dgo7",
  49: "i0nlzrtnvi9yrqkebtpcm62w",
  50: "enw4wbw88b00q2xicb2o1rsy",
  51: "a6wmutj8bqeht9nfl7yxnc3d",
  52: "fv4xxo5hto4r1vig9iqf6dfj",
  53: "t8jp6as5dg3uzurbfje76gdu",
  54: "wupth3zcquuei5y4xbcnwsmy",
  55: "awiczm8wibzpw96qhwqdfq13",
  56: "dbxbpiquypzk3a7do17gnnw1",
  59: "mac4jienwiedx3rlmlepchcd",
  60: "dmtxmltwiigfdrbi3x0td11x",
  61: "jmayhv69l362b8hxc2qjo361",
  85: "bsfhwohbv58bcdffqfllj3jv",
  62: "uxxvdyhggn8c3zgtkxqcn4pp",
  63: "gt79ndggatpreo3w3j2xavfh",
  65: "j0b1x6o0ycytfrt4ku9o9ktr",
  67: "e1n70l0opojjz4e161g31ua7",
  68: "de4clbn34xaqrdvzr2rms6ut",
  66: "vp8xr8fn9bdqsn0op63lfakh",
  69: "ghwz0aswk7cbix5snsytr6bd",
  70: "ss9wfgdd5ao9nfzcgr28yudx",
  71: "zvlj7t2ofkqw1y0kntatkb7c",
  72: "njk5wmudazdkdabtjzp0kwhi",
  73: "huugpw6am58t5hkimc47uc2v",
  74: "a6jalz4q0f9zt5gs1gcgfhie",
  75: "bovcuanwpog3rt5e4wzcbcry",
  76: "bzuj3xbcp3rxtpa2ghjdju61",
  77: "f4tzkxzf4dyfyvyd8b88ytod",
  98: "yhr34huh7aq9o5lx46ke8d2o",
  78: "k8ekxv1r3yj1t4znunoofvs7",
  81: "ecz2j30f6nnccgfd4fg9tsij",
  82: "tmlp0hbd6mxmmrgyle83c6r1",
  83: "eebp6eb17n85e6c9rkroukxa",
  84: "tj3yt1eno7pspe5lqwdduhpr",
  86: "x4ihiycsanp0aqfaaqxwvz16",
  87: "zlmobsvdcgawk3p5kh7d7yh0",
  88: "o0rwyuu9oo2rhstbg2zyn2m2",
  89: "nmcw9bx19bzvyobpo9roolkv",
  90: "ny0bqa7p9wovm8grjqrz4hbk",
  92: "k6mxl0264gix4rbi39dehxhu",
  91: "vhmpg9bulv0o4jvgkro3adqd",
  93: "nbxd6nma16d5zw1v1deiqdow",
  94: "ezrhxalnotfl1pdwx91pjh2m",
  95: "ue88lebrccfjd7d1lvfcv884",
  96: "v90mlx02m7kfnr3pbgzp73xd",
  97: "nw2h6w5sry8v1eebn6uh78q7",
  99: "tuv26wjut31olm44xi5edtmp",
  100: "i54bqfwj8ecz47ofi13lb7cd",
  102: "bh8hkuij1ftzg2dg9x6555f3",
  103: "qe29r66t5240i70il6pwv8op",
  104: "qn8gescylv1wc7ohp90z5fcv",
  105: "szj1ob7cdb3yv20yvhfwfk5n",
  106: "zdrfj5otz9dtj5hsoymhdd6y",
  107: "oqqr9o43m3ohq0s9sc7khegp",
  110: "zffcy453fj9jetnbiilmi5mn",
  111: "qdwbtirfqs03c9t9m6uftcgy",
  162: "uxwkmisrid5xyj4zkf6cklt7",
  112: "k2n5fsln3ni85i48tmq2eimu",
  113: "u6m95p4x3cy056jwc4syebmo",
  109: "w4d15bldpjsfh9tcx6063xkg",
  119: "ranzroughujtpo0wp7py96y2",
  120: "ceshptcap6rkxwzy9c4lim91",
  121: "qwp0sjcm7sekyr8ybam9pji3",
  122: "s76wz89gj6nh79lolmhbqnyr",
  123: "zx8d8zjnbtixy0ibyv01i7td",
  125: "orqvaq66dt43hnon8h94kloq",
  126: "yvdroag8lhnqhmq9vgzvko57",
};

const RETOUR_EXPERIENCE_ID_MAP: Record<number, string> = {
  128: "essiqm28hqbxn8x556sdysgr",
  45: "j26mr598zdp3oiumw6tubb80",
  17: "hfq8bnlbhx0k3458yzkalo5f",
  30: "f8okab41na02nckcxubfv1ug",
  44: "tl1qfni90266leesiudsyiqq",
  39: "lnmodaks9ca5w4gz7o1v0oeu",
  49: "l6vhpudnd7765gvc4vmabubh",
  33: "sj6umepymt10dsg1eff7voes",
  46: "qto0a8po7ekgzeeot31ysv16",
  15: "td3os3mqzker80yxcqvqipfc",
  8: "bqgpryyzjtx4iwwe2z9unl7a",
  36: "ysu8llyt5uizx99on0z1i43q",
  29: "foo6rd2fmxge5bqt76etbugi",
  13: "q2pyj7z3ch2xwca77tyuimne",
  24: "aal94my1hsb8sf1s3v40sm9i",
  23: "zgteia4q7bc6lcmgykl8r5k2",
  37: "p0jh096pifoav9y28rtt8wsy",
  35: "nl5mrqrsvbnqxahyuzi26c9w",
  26: "dyj0if5ek3ghjba3n1wifvwq",
  18: "atkhypykok4mxq9uvhuc6qoq",
  16: "ylym0tpwa64pgvodtiwh9wjh",
  28: "y7iqm0jwhlkdu09ppn26v2ts",
  10: "oy7q93liase61quu2wxhscld",
  129: "j26mr598zdp3oiumw6tubb80",
  38: "w0wz57fhar0hpk67g7scr4it",
  21: "oomq9err9bkt244bxu9u5sea",
  90: "rluw28q4ero3y06nd3g7x6h3",
  92: "atk7xvz0t7213rhyt5w2l9gf",
  87: "jh6e8kcuz9t9g5be6jnx382k",
  34: "rpnqhhqcu86dbglhs440yef1",
  20: "ifwiwbbqzor36flgrb9xddlv",
  22: "c4u6jsxxxucao22k77d9r5kv",
  25: "we11cb980suq6dkv2ms2xnuq",
  50: "a1zyspx3ncv6oqyjdpa3nkpr",
  43: "hyme3qv9hbwpetgmjwxh8jb9",
  88: "zx5ntxua3rpj4o2r8aa7aks6",
  89: "z8qop0cbzzel1byp1w7ezqfv",
  53: "tvt239yyzkkqak1047pq1ox7",
  32: "po0wgfqukwh8gk6bg92ydq87",
  27: "j1f27h1r6knmtcrdt7svupfl",
  31: "yxvty8b27il2ci6jpj71oo7n",
  42: "q7r1z67p960i15tsuo8mphmz",
  48: "vqhqq4qiyws1i30zbc1hsn7b",
  40: "jivmplyv9z15c93jd9xr7p2x",
  52: "y88we2oxj1vyvtakwhp30vjr",
  51: "qwue464afjvmuauak4bxb7up",
  11: "we26peg7vswx0f5len9hy0i5",
  47: "l3d7z0obzzmyjeeczzoycijj",
  12: "raow4ydar66rtijds9curna2",
  127: "arty0b9589i1nimfdetwcyzj",
  86: "t238h5j17sp8jy2os5jqj0pz",
  14: "kf6rs02h92nmcvoyu9icdyis",
  19: "djbl63ugm6m7cre8x37alf6v",
  93: "uzcnnmxqovv0aiygd319q6k6",
  91: "x2jx4ys033u9w4s2l0sucw4t",
  41: "d7jkrlbmkembhym6qn9ew8wb",
  94: "ovmm5jo5fvu2w8jqm5h54p0n",
  130: "hfq8bnlbhx0k3458yzkalo5f",
  131: "f8okab41na02nckcxubfv1ug",
  132: "tl1qfni90266leesiudsyiqq",
  133: "lnmodaks9ca5w4gz7o1v0oeu",
  134: "l6vhpudnd7765gvc4vmabubh",
  135: "sj6umepymt10dsg1eff7voes",
  136: "qto0a8po7ekgzeeot31ysv16",
  137: "td3os3mqzker80yxcqvqipfc",
  138: "bqgpryyzjtx4iwwe2z9unl7a",
  139: "ysu8llyt5uizx99on0z1i43q",
  140: "foo6rd2fmxge5bqt76etbugi",
  141: "q2pyj7z3ch2xwca77tyuimne",
  142: "aal94my1hsb8sf1s3v40sm9i",
  143: "zgteia4q7bc6lcmgykl8r5k2",
  144: "p0jh096pifoav9y28rtt8wsy",
  145: "nl5mrqrsvbnqxahyuzi26c9w",
  146: "atkhypykok4mxq9uvhuc6qoq",
  147: "ylym0tpwa64pgvodtiwh9wjh",
  148: "y7iqm0jwhlkdu09ppn26v2ts",
  149: "oy7q93liase61quu2wxhscld",
  150: "w0wz57fhar0hpk67g7scr4it",
  151: "oomq9err9bkt244bxu9u5sea",
  152: "rluw28q4ero3y06nd3g7x6h3",
  153: "atk7xvz0t7213rhyt5w2l9gf",
  154: "jh6e8kcuz9t9g5be6jnx382k",
  155: "rpnqhhqcu86dbglhs440yef1",
  156: "ifwiwbbqzor36flgrb9xddlv",
  157: "c4u6jsxxxucao22k77d9r5kv",
  158: "we11cb980suq6dkv2ms2xnuq",
  159: "a1zyspx3ncv6oqyjdpa3nkpr",
  160: "hyme3qv9hbwpetgmjwxh8jb9",
  161: "zx5ntxua3rpj4o2r8aa7aks6",
  162: "z8qop0cbzzel1byp1w7ezqfv",
  163: "tvt239yyzkkqak1047pq1ox7",
  164: "po0wgfqukwh8gk6bg92ydq87",
  165: "j1f27h1r6knmtcrdt7svupfl",
  166: "yxvty8b27il2ci6jpj71oo7n",
  167: "q7r1z67p960i15tsuo8mphmz",
  168: "vqhqq4qiyws1i30zbc1hsn7b",
  169: "jivmplyv9z15c93jd9xr7p2x",
  170: "y88we2oxj1vyvtakwhp30vjr",
  171: "qwue464afjvmuauak4bxb7up",
  172: "we26peg7vswx0f5len9hy0i5",
  173: "l3d7z0obzzmyjeeczzoycijj",
  174: "raow4ydar66rtijds9curna2",
  175: "t238h5j17sp8jy2os5jqj0pz",
  176: "kf6rs02h92nmcvoyu9icdyis",
  177: "djbl63ugm6m7cre8x37alf6v",
  178: "uzcnnmxqovv0aiygd319q6k6",
  179: "x2jx4ys033u9w4s2l0sucw4t",
  180: "d7jkrlbmkembhym6qn9ew8wb",
};

function mapId(map: Record<number, string>, rawValue: string, context: string): string | null {
  const oldId = Number(rawValue);
  if (!Number.isNaN(oldId) && map[oldId]) {
    return map[oldId];
  }
  if (Object.values(map).includes(rawValue)) {
    // Already migrated in a previous run of this script.
    return rawValue;
  }
  console.warn(`  ⚠️  ${context}: no correspondence found for "${rawValue}", leaving unchanged.`);
  return null;
}

function mapArray(map: Record<number, string>, values: string[], context: string): string[] {
  const mapped = values.map((v) => mapId(map, v, context) ?? v);
  return Array.from(new Set(mapped));
}

async function migrateProjetFicheArrays() {
  console.log("Migrating projet.fiches_solutions_id / fiches_diagnostic_id...");
  const projets = await prismaClient.projet.findMany({
    select: { id: true, fiches_solutions_id: true, fiches_diagnostic_id: true },
  });

  for (const projet of projets) {
    const newFichesSolutionsId = mapArray(
      FICHE_SOLUTION_ID_MAP,
      projet.fiches_solutions_id,
      `projet ${projet.id}.fiches_solutions_id`,
    );
    const newFichesDiagnosticId = mapArray(
      FICHE_DIAGNOSTIC_ID_MAP,
      projet.fiches_diagnostic_id,
      `projet ${projet.id}.fiches_diagnostic_id`,
    );

    const changed =
      JSON.stringify(newFichesSolutionsId) !== JSON.stringify(projet.fiches_solutions_id) ||
      JSON.stringify(newFichesDiagnosticId) !== JSON.stringify(projet.fiches_diagnostic_id);

    if (changed && !DRY_RUN) {
      await prismaClient.projet.update({
        where: { id: projet.id },
        data: { fiches_solutions_id: newFichesSolutionsId, fiches_diagnostic_id: newFichesDiagnosticId },
      });
    }
  }
}

async function migrateProjetFiche() {
  console.log("Migrating projet_fiche.fiche_id...");
  const projetFiches = await prismaClient.projet_fiche.findMany();

  for (const pf of projetFiches) {
    const map = pf.type === FicheType.SOLUTION ? FICHE_SOLUTION_ID_MAP : FICHE_DIAGNOSTIC_ID_MAP;
    const newFicheId = mapId(map, pf.fiche_id, `projet_fiche ${pf.id} (projet ${pf.projet_id})`);

    if (!newFicheId || newFicheId === pf.fiche_id) continue;

    if (!DRY_RUN) {
      try {
        await prismaClient.projet_fiche.update({ where: { id: pf.id }, data: { fiche_id: newFicheId } });
      } catch (e) {
        console.warn(
          `  ⚠️  projet_fiche ${pf.id}: could not update to fiche_id "${newFicheId}" ` +
            `(probably a duplicate created by the old draft/published id collapsing to the same document). ` +
            `Leaving the row as-is for manual review. Error: ${e}`,
        );
      }
    }
  }
}

async function migrateEstimationFicheSolution() {
  console.log("Migrating estimation_fiche_solution.fiche_solution_id...");
  const rows = await prismaClient.estimation_fiche_solution.findMany();

  for (const row of rows) {
    const newId = mapId(FICHE_SOLUTION_ID_MAP, row.fiche_solution_id, `estimation_fiche_solution ${row.id}`);
    if (!newId || newId === row.fiche_solution_id) continue;

    if (!DRY_RUN) {
      try {
        await prismaClient.estimation_fiche_solution.update({
          where: { id: row.id },
          data: { fiche_solution_id: newId },
        });
      } catch (e) {
        console.warn(
          `  ⚠️  estimation_fiche_solution ${row.id}: could not update to fiche_solution_id "${newId}" ` +
            `(likely a duplicate within the same estimation). Leaving as-is for manual review. Error: ${e}`,
        );
      }
    }
  }
}

async function migrateEstimationMateriaux() {
  console.log("Migrating estimation_materiaux.materiau_id...");
  const rows = await prismaClient.estimation_materiaux.findMany();

  for (const row of rows) {
    const newId = mapId(MATERIAU_ID_MAP, row.materiau_id, `estimation_materiaux ${row.id}`);
    if (!newId || newId === row.materiau_id) continue;

    if (!DRY_RUN) {
      try {
        await prismaClient.estimation_materiaux.update({ where: { id: row.id }, data: { materiau_id: newId } });
      } catch (e) {
        console.warn(
          `  ⚠️  estimation_materiaux ${row.id}: could not update to materiau_id "${newId}" ` +
            `(likely a duplicate within the same estimation_fiche_solution). ` +
            `Leaving as-is for manual review. Error: ${e}`,
        );
      }
    }
  }
}

async function migrateUserProjet() {
  console.log("Migrating user_projet.fiches_diagnostic_seen / aides_fs_unselected / annuaire_rex_projet_clicked...");
  const userProjets = await prismaClient.user_projet.findMany({
    select: { id: true, fiches_diagnostic_seen: true, aides_fs_unselected: true, annuaire_rex_projet_clicked: true },
  });

  for (const up of userProjets) {
    const newSeen = mapArray(
      FICHE_DIAGNOSTIC_ID_MAP,
      up.fiches_diagnostic_seen,
      `user_projet ${up.id}.fiches_diagnostic_seen`,
    );
    const newUnselected = mapArray(
      FICHE_SOLUTION_ID_MAP,
      up.aides_fs_unselected,
      `user_projet ${up.id}.aides_fs_unselected`,
    );
    const newClicked = mapArray(
      RETOUR_EXPERIENCE_ID_MAP,
      up.annuaire_rex_projet_clicked,
      `user_projet ${up.id}.annuaire_rex_projet_clicked`,
    );

    const changed =
      JSON.stringify(newSeen) !== JSON.stringify(up.fiches_diagnostic_seen) ||
      JSON.stringify(newUnselected) !== JSON.stringify(up.aides_fs_unselected) ||
      JSON.stringify(newClicked) !== JSON.stringify(up.annuaire_rex_projet_clicked);

    if (changed && !DRY_RUN) {
      await prismaClient.user_projet.update({
        where: { id: up.id },
        data: {
          fiches_diagnostic_seen: newSeen,
          aides_fs_unselected: newUnselected,
          annuaire_rex_projet_clicked: newClicked,
        },
      });
    }
  }
}

type RexContactId = { rexId: string | number; contactId: string | number };

async function migrateProjetSourcingRex() {
  console.log("Migrating projet.sourcing_rex (Json field)...");
  const projets = await prismaClient.projet.findMany({
    select: { id: true, sourcing_rex: true },
  });

  for (const projet of projets) {
    const rexContactIds = projet.sourcing_rex as unknown as RexContactId[] | null;
    if (!rexContactIds || !Array.isArray(rexContactIds)) continue;

    let changed = false;
    const newRexContactIds = rexContactIds.map((rc) => {
      const newRexId = mapId(RETOUR_EXPERIENCE_ID_MAP, String(rc.rexId), `projet ${projet.id}.sourcing_rex`);
      if (newRexId && newRexId !== String(rc.rexId)) {
        changed = true;
        return { ...rc, rexId: newRexId };
      }
      return rc;
    });

    if (changed && !DRY_RUN) {
      await prismaClient.projet.update({
        where: { id: projet.id },
        data: { sourcing_rex: newRexContactIds as unknown as object[] },
      });
    }
  }
}

async function migrate() {
  console.log(DRY_RUN ? "DRY RUN — no data will be written. Pass --apply to write changes.\n" : "APPLYING CHANGES.\n");

  await migrateProjetFicheArrays();
  await migrateProjetFiche();
  await migrateEstimationFicheSolution();
  await migrateEstimationMateriaux();
  await migrateUserProjet();
  await migrateProjetSourcingRex();

  console.log("\nDone.");
}

migrate()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
