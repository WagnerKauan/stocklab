import { Logo } from '@/components/ui/logo';
import Image from 'next/image';
import { RegisterForm } from './_components/registerForm';

export default async function Register() {
  return (
    <div className="h-dvh flex items-center justify-center bg-background-normal">
      <main className="border border-secondary-light/20 rounded-2xl flex p-8 gap-8 bg-white w-full max-w-4xl">
        <section className="bg-primary-normal rounded-2xl p-8 flex-1 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              src="/imageFormRegister.svg"
              width={330}
              height={285}
              alt="imageFormRegister"
            />

            <div className="flex flex-col justify-center items-center gap-2 text-white">
              <h3 className="text-3xl">Comece gratuitamente</h3>
              <p className="w-full max-w-sm text-center">
                Organize seu estoque, acompanhe vendas e simplifique sua
                operação.
              </p>
            </div>
          </div>
        </section>

        <section className='flex-1'>
          <Logo size={'text-[18px]'} />
          
          <RegisterForm />
        </section>
      </main>
    </div>
  );
}
