/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "../components/IndexNavbar";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <React.Fragment>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-gray-700">
                KHỞI NGUỒN
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Binh's Coffee được sinh ra từ niềm đam mê bất tận với hạt cà
                phê Việt Nam. Qua một chặng đường dài, chúng tôi đã không ngừng
                mang đến những sản phẩm cà phê thơm ngon, sánh đượm trong không
                gian thoải mái và lịch sự với mức giá hợp lý. Những ly cà phê
                của chúng tôi không chỉ đơn thuần là thức uống quen thuộc mà còn
                mang trên mình một sứ mệnh văn hóa phản ánh một phần nếp sống
                hiện đại của người Việt Nam.
              </p>
              <div className="mt-12">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  QUÉT MÃ BÀN ĐỂ GỌI MÓN
                </a>
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src="assets/images/pattern.png"
          alt="..."
        />
        </section>
      <Footer />
      </React.Fragment>
  );
};
export default Index;
