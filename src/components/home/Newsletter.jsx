import { FiMail } from "react-icons/fi";
import { useEmailSubscribe } from "../../hooks/useEmailSubscribe";

export const Newsletter = () => {
  const { email, setEmail, submit } = useEmailSubscribe();

  return (
    <section className="bg-blue-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">

        <div className="text-center md:text-left">
          <p className="font-bold text-xl">Get the best travel deals straight to your inbox!</p>
          <p className="text-sm text-gray-600 mt-1">Subscribe to our newsletter and never miss an offer.</p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="flex flex-col sm:flex-row gap-2 w-full md:max-w-[560px]"
        >
          <div className="relative flex-1">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              aria-label="Email address"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#031e3d]/40"
            />
          </div>

          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-[#031e3d] hover:bg-[#052a54] transition-colors text-white font-medium cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};
