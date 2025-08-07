"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/src/components/common/InputFormField";
import { ContactFormData, ContactFormSchema } from "@/src/forms/contact/contact-form-schema";
import { useUserStore } from "@/src/stores/user/provider";
import { sendContactMessageAction } from "@/src/actions/contact/send-contact-message-action";
import SelectFormField from "@/src/components/common/SelectFormField";
import { objetMessageContactOptions } from "@/src/helpers/objet-message-contact";
import { notifications } from "@/src/components/common/notifications";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { mapDBCollectiviteToCollectiviteAddress } from "@/src/lib/adresseApi/banApiHelper";
import ToggleSwitch from "@codegouvfr/react-dsfr/ToggleSwitch";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import CollectiviteInputFormField from "@/src/components/common/CollectiviteInputFormField";

export const ContactForm = () => {
  const user = useUserStore((state) => state.userInfos);
  const router = useRouter();

  const [isCollectivite, setIsCollectivite] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      nom: user?.nom ?? "",
      prenom: user?.prenom ?? "",
      email: user?.email ?? "",
      objetMessage: "",
      message: "",
      telephone: "",
      subscribeToNewsletter: false,
      collectivite: mapDBCollectiviteToCollectiviteAddress(user?.collectivites[0]?.collectivite) ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (!isCollectivite) {
      data.collectivite = null;
    }
    const actionResult = await sendContactMessageAction(data);
    if (actionResult.type === "error") {
      notifications(actionResult.type, actionResult.message);
    } else {
      router.push(PFMV_ROUTES.CONTACT_SUCCESS);
    }
  };

  useEffect(() => {
    form.setValue("nom", user?.nom ?? "");
    form.setValue("prenom", user?.prenom ?? "");
    form.setValue("email", user?.email ?? "");
    form.setValue(
      "collectivite",
      mapDBCollectiviteToCollectiviteAddress(user?.collectivites[0]?.collectivite) ?? undefined,
    );
  }, [form, user]);

  const disabled = form.formState.isSubmitting;
  return (
    <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
      <InputFormField control={form.control} path="prenom" label="Votre prénom" asterisk={true} />
      <InputFormField control={form.control} path="nom" label="Votre nom" asterisk={true} />
      <InputFormField control={form.control} path="email" label="Votre adresse email" asterisk={true} />
      <InputFormField control={form.control} path="telephone" label="Votre numéro de téléphone (optionnel)" />
      <SelectFormField
        control={form.control}
        asterisk={true}
        label="Objet de votre message"
        path="objetMessage"
        options={objetMessageContactOptions()}
        placeholder="Sélectionnez un objet"
      />
      <InputFormField
        control={form.control}
        path="message"
        label="Votre message"
        asterisk={true}
        type="textarea"
        rows={5}
      />

      <Checkbox
        options={[
          {
            label: "Je souhaite m'abonner à la newsletter",
            nativeInputProps: {
              ...form.register("subscribeToNewsletter"),
            },
          },
        ]}
      />
      <Conditional>
        <Case condition={form.watch("subscribeToNewsletter")}>
          <ToggleSwitch
            className="max-w-60"
            label="Je suis une collectivite"
            checked={isCollectivite}
            onChange={(checked) => setIsCollectivite(checked)}
            labelPosition="left"
            showCheckedHint={false}
          />
          <Conditional>
            <Case condition={isCollectivite}>
              <CollectiviteInputFormField
                control={form.control}
                path={"collectivite"}
                label="Nom de votre collectivité"
                asterisk
              />
            </Case>
          </Conditional>
        </Case>
      </Conditional>
      <Button className={`float-right mt-4 rounded-3xl`} type="submit" disabled={disabled}>
        Envoyer
      </Button>
    </form>
  );
};
