
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { ILogin } from "../interface/users";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";


const Login: React.FC = () => {
  const { login } = useContext(AuthContext)
  const [form, setForm] = useState<ILogin>({
    email: '',
    password: ''
  })
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [capcha, setCapcha] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [number, setNumber] = useState<number>(Number(localStorage.getItem("capcha")) || 0)

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    localStorage.setItem("capcha", String(number))
  }, [number])


  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      email: e.target.value,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (number < 10 || (number >= 10 && capcha === true)) {
      login(form, setCapcha, recaptchaRef, setNumber, number);
    }
  };

  const onChange = (value: any) => {
    setCapcha(true)
  }



  return <Fragment>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={logo}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          CRM Phòng Khám Đa Khoa
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email :
            </label>
            <div className="mt-2">
              <input
                onChange={handleChangeEmail}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password :
              </label>
              <div className="text-sm">
                <Link to="" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={handleChangePassword}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {
            number >= 10 && <ReCAPTCHA
              size="normal"
              ref={recaptchaRef}
              sitekey="6LeMD6cqAAAAAG-hOuoYeMog3oXJTWKUZQcBC1A4"
              onChange={onChange}
            />
          }

          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  </Fragment>
}

export default Login;