import { Logo } from '@/components/ui/logo';
import Image from 'next/image';
import { LoginForm } from './_components/loginForm';

export default async function login() {
  return (
    <div className="h-dvh flex items-center justify-center bg-background-normal">
      <main className="border border-secondary-light/20 rounded-2xl flex p-8 gap-8 bg-white w-full max-w-4xl">
        <section className="bg-primary-normal rounded-2xl p-8 flex-1 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              src="/imageFormLogin.svg"
              width={330}
              height={285}
              alt="imageFormRegister"
            />

            <div className="flex flex-col justify-center items-center gap-2 text-white">
              <h3 className="text-3xl text-center">Gerencie seu estoque com facilidade</h3>
              <p className="w-full max-w-sm text-center">
                Controle produtos, acompanhe saídas e mantenha sua loja sempre
                organizada.
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1">
          <Logo size={'text-[18px]'} />

          <LoginForm />
        </section>
      </main>
    </div>
  );
}
