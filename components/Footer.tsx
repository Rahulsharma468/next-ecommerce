function Footer() {
    return (
      <div className="flex flex-col py-9 bg-sky-300">
        <div className="flex gap-5 justify-between items-start self-center px-5 max-w-full w-[1276px] max-md:flex-wrap">
          <div className="flex flex-col self-stretch text-sm tracking-wide leading-6 text-black text-opacity-80">
            <div className="text-lg leading-6 text-black">Short Link</div>
            <div className="mt-2">Returns & Refunds</div>
            <div className="mt-2">Faqs</div>
            <div className="mt-2">Bulk Orders</div>
            <div className="mt-2">Shipping Policy</div>
            <div className="mt-2">Stores</div>
            <div className="mt-2">Terms & Conditions</div>
            <div className="mt-2">Privacy Policy</div>
          </div>
          <div className="flex flex-col text-sm tracking-wide leading-6 text-black text-opacity-80">
            <div className="text-lg leading-6 text-black">Info</div>
            <div className="mt-2">About Us</div>
            <div className="mt-2">Shop</div>
            <div className="mt-2">Careers</div>
            <div className="mt-2">Contact Us</div>
          </div>
          <div className="flex flex-col items-start">
            <img
              loading="lazy"
              srcSet="..."
              className="max-w-full aspect-[2.86] w-[200px]"
            />
            <div className="self-stretch mt-2 text-base tracking-wide leading-7 text-black text-opacity-80">
              A LITTLE EXTRA is a quirky jewellery brand. All
              <br />
              its jewellery is handpicked and handmade
              <br />
              making it unique and a rare find.
            </div>
            <div className="flex gap-5 justify-between mt-5 max-md:ml-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ee96c4b84ec16a4b3d1ae80a344548889a22071fea0cd86f887fa5d651b0839?"
                className="shrink-0 aspect-square w-[18px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cda5dfbdf3489976d34925b4bbc810bd823a78b55455391eeb84fcdd06b39170?"
                className="shrink-0 aspect-square w-[18px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdb49b92a2148281cf743f1605f0ba1e3a0030d62e4a873a9665c9fd50773a03?"
                className="shrink-0 aspect-square w-[18px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center px-5 pt-5 pb-1 mt-5 w-full text-xs tracking-wider leading-4 text-right border-t border-solid border-black border-opacity-10 text-black text-opacity-80 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col max-w-full w-[117px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8ba55cbf0a7b8a35cbf4994b6b3ccd8cc2013855f3d45d4f6fdb17a3a960de?"
              className="self-center aspect-[1.59] w-[38px]"
            />
            <div className="mt-5">© 2024, A Little Extra</div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Footer;
  