import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScreenLayout } from "@/components/ui/screen-layout";

export default function LoginPage() {
  return (
    <ScreenLayout
      eyebrow="Acesso"
      title="Entrar na plataforma"
      description="Autenticacao mock/local para o MVP. Nesta etapa, o formulario e apenas estrutural."
    >
      <div className="mx-auto max-w-md">
        <Card>
          <form className="space-y-4" action="#">
            <Input id="email" label="Email" type="email" placeholder="voce@oraklo.com" />
            <Input id="password" label="Senha" type="password" placeholder="Digite sua senha" />

            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </ScreenLayout>
  );
}
