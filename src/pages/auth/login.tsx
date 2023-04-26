import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

//
import Input from '@src/components/inputs/Input';
import useLogin from '@src/react-query/auth/useLogin';
import RequireNotLogin from '@src/components/hoc/RequireNotLogin';
import userSchema from '@src/yup/userSchema';

interface Inputs {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isValidating },
  } = useForm<Inputs>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: 'nsnl.coder@gmail.com',
      password: 'password',
    },
  });

  const { login, isLoading, apiError, reset } = useLogin();
  const onSubmit = (data: any) => login(data);

  useEffect(() => {
    if (apiError && isValidating) {
      reset();
    }
  }, [isValidating, apiError, reset]);

  return (
    <RequireNotLogin>
      <div className="modal modal-open">
        <div className="modal-box rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-semibold text-2xl mb-8">Login</h2>
            <Input
              register={register}
              fieldName="email"
              control={control}
              label="Email:"
              labelTheme="light"
            />
            <Input
              register={register}
              fieldName="password"
              control={control}
              label="Password:"
              type="password"
              labelTheme="light"
            />
            {isValid && apiError?.message && (
              <div className="mb-6 text-sm text-red-400">
                {apiError.message}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-primary px-8 text-white py-3 rounded-md font-medium text-lg ${
                  isLoading ? 'bg-primary/50' : ''
                }`}
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </RequireNotLogin>
  );
}

Login.requireAdmin = false;

export default Login;
