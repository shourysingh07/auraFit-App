import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[70%] mx-auto bg-blue-100 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Shoury Singh
            </h2>
            <p className="mt-2 text-gray-600 text-xl font-bold">
              FullStack Developer
            </p>
          </div>
          <div className="mt-6 ">
            <ul className="text-xl text-gray-600">
              <li className="flex items-center mb-2">
                <MdOutlineMailOutline className="mr-2" />
                <span className="flex text-xl font-bold">
                  Email: <p className="ml-2">shourysingh007@gmail.com</p>
                </span>
              </li>
              <li className="flex items-center mb-2">
                <FaLinkedin className="mr-2" />
                <span className="flex font-bold">
                  LinkedIn:
                  <p className="ml-2">
                    <a
                      href="https://www.linkedin.com/in/shoury2007/"
                      target="_blank"
                      className="text-blue-500"
                    >
                      https://www.linkedin.com/in/shoury2007/
                    </a>
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
