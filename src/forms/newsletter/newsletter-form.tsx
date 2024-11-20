"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/src/components/common/InputFormField";
import { useUserStore } from "@/src/stores/user/provider";
import { notifications } from "@/src/components/common/notifications";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { NewsletterFormData, NewsletterFormSchema } from "@/src/forms/newsletter/newsletter-form-schema";
import ToggleSwitch from "@codegouvfr/react-dsfr/ToggleSwitch";
import { subscribeNewsletterAction } from "@/src/actions/newsletter/subscribe-newsletter-action";
import CollectiviteInputFormField from "@/src/components/common/CollectiviteInputFormField";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { mapDBCollectiviteToCollectiviteAddress } from "@/src/lib/adresseApi/banApiHelper";

export const NewsletterForm = ({ rerouteAfterSuccess = false }: { rerouteAfterSuccess?: boolean }) => {
  const user = useUserStore((state) => state.userInfos);
  const userCollectivite = user?.collectivites[0]?.collectivite;
  const router = useRouter();
  const [isCollectivite, setIsCollectivite] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: user?.email ?? "",
      collectivite: mapDBCollectiviteToCollectiviteAddress(user?.collectivites[0]?.collectivite) ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
    if (!isCollectivite) {
      data.collectivite = null;
    }
    const actionResult = await subscribeNewsletterAction(data);
    if (actionResult.type === "error") {
      notifications(actionResult.type, actionResult.message);
    } else {
      if (rerouteAfterSuccess) {
        router.push(PFMV_ROUTES.NEWSLETTER_SUCCESS);
      } else {
        notifications(actionResult.type, actionResult.message);
      }
    }
  };

  useEffect(() => {
    form.setValue("email", user?.email ?? "");
    if (userCollectivite) {
      form.setValue("collectivite", mapDBCollectiviteToCollectiviteAddress(userCollectivite) ?? undefined);
    }
  }, [form, user?.email, userCollectivite]);

  const disabled =
    form.formState.isSubmitting || !form.watch("email") || (isCollectivite && !form.watch("collectivite"));
  return (
    <form id="newsletter-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <InputFormField control={form.control} path="email" label="Votre adresse email" asterisk={true} />

      <ToggleSwitch
        className="max-w-60"
        label="Je suis une collectivité"
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
      <Button className={`float-right mt-4 rounded-3xl`} type="submit" disabled={disabled}>
        {"S'abonner"}
      </Button>
    </form>
  );
};
