"use client";

import React, { useState, useEffect } from "react";
import { trendingProducts } from "../data/dummyData";
import Image from "next/image";

export default function OrderDetailsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [comment, setComment] = useState("");

  const [trackingId, setTrackingId] = useState("1DFGSNCBCG");
  const [isEditing, setIsEditing] = useState(false);

  const orderTimeline = [
    {
      status: "Order Placed",
      date: "05 Dec 2024 15:46",
      completed: true,
      icon: (<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.6312 6.60736C21.4898 6.45905 21.2935 6.375 21.0885 6.375H16.6251V5.625C16.6251 2.7301 14.27 0.375 11.3751 0.375H10.6251C7.73018 0.375 5.37508 2.7301 5.37508 5.625V6.375H0.911703C0.706624 6.375 0.510335 6.45905 0.368978 6.60736C0.227254 6.75586 0.152913 6.95581 0.162435 7.16071L0.84432 21.4819C0.901815 22.6838 1.88875 23.625 3.09176 23.625H18.9084C20.1114 23.625 21.0984 22.6838 21.1558 21.4819L21.8377 7.16071C21.8473 6.95581 21.7729 6.75586 21.6312 6.60736ZM6.87508 5.625C6.87508 3.55719 8.55746 1.875 10.6251 1.875H11.3751C13.4427 1.875 15.1251 3.55719 15.1251 5.625V6.375H6.87508V5.625ZM19.6573 21.4109C19.6383 21.8112 19.3094 22.125 18.9084 22.125H3.09176C2.69076 22.125 2.3619 21.8112 2.34285 21.4109L1.69832 7.875H5.37508V10.5C5.37508 10.9142 5.7109 11.25 6.12508 11.25C6.53927 11.25 6.87508 10.9142 6.87508 10.5V7.875H15.1251V10.5C15.1251 10.9142 15.4609 11.25 15.8751 11.25C16.2893 11.25 16.6251 10.9142 16.6251 10.5V7.875H20.3018L19.6573 21.4109Z" fill="#040458"/>
        </svg>
        ),
    },
    {
      status: "Packed",
      date: "06 Dec 2024 10:46",
      completed: true,
      icon: (<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.56131 7.44153L12.0001 1.50012L2.61643 0.255203C2.35881 0.221218 2.10906 0.358328 1.99656 0.602468L0.0658685 4.61731C-0.107569 4.98059 0.0765185 5.41028 0.442181 5.51575L7.83343 7.72395C8.13006 7.80481 8.41506 7.68762 8.56131 7.44153ZM23.9363 4.61731L22.0054 0.601687C21.8929 0.357546 21.6395 0.220515 21.3818 0.254695L12.0001 1.50012L15.4403 7.44153C15.581 7.68567 15.8671 7.80329 16.1344 7.72516L23.5557 5.51774C23.9251 5.40637 24.1051 4.97669 23.9363 4.61731ZM15.9676 9.05091C15.3301 9.05091 14.7346 8.70133 14.4113 8.14309L12.0001 4.00012L9.59256 8.14075C9.26631 8.70325 8.67381 9.05481 8.03631 9.05481C7.86756 9.05481 7.69881 9.03055 7.53943 8.98204L2.40006 7.45716V14.3361C2.40006 14.9091 2.77502 15.4044 3.30943 15.5404L11.4132 17.6427C11.7976 17.7398 12.1962 17.7398 12.5757 17.6427L20.6907 15.5404C21.1913 15.4337 21.6001 14.9376 21.6001 14.3712V7.45716L16.4626 8.97669C16.3051 9.02356 16.1363 9.05091 15.9676 9.05091Z" fill="#040458"/>
        </svg>
        ),
    },
    {
      status: "Shipped",
      date: "06 Dec 2024 14:46",
      completed: true,
      icon: (<svg width="36" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.808 3.97266C32.6658 3.76953 32.4322 3.64766 32.1885 3.64766H27.4658V1.63672C27.4658 1.22031 27.1205 0.875 26.7041 0.875H9.59082C9.17441 0.875 8.8291 1.22031 8.8291 1.63672V13.9461C8.8291 14.3625 9.17441 14.7078 9.59082 14.7078H11.7439C12.14 16.0891 13.4197 17.1148 14.9229 17.1148C16.426 17.1148 17.7057 16.0992 18.1018 14.7078H26.5416C26.9377 16.0891 28.2174 17.1148 29.7205 17.1148C31.2236 17.1148 32.5033 16.0992 32.8994 14.7078H34.4736C34.89 14.7078 35.2354 14.3625 35.2354 13.9461V7.67969C35.2354 7.51719 35.1846 7.36484 35.0932 7.24297L32.808 3.97266ZM33.7221 7.90312H30.3096V5.18125H31.8025L33.7221 7.90312ZM10.3525 2.40859H25.9424V13.1945H18.1729C17.8783 11.6609 16.5377 10.5031 14.9229 10.5031C13.308 10.5031 11.9572 11.6609 11.6729 13.1945H10.3525V2.40859ZM14.9229 15.5914C13.9377 15.5914 13.1354 14.7891 13.1354 13.8039C13.1354 12.8187 13.9377 12.0164 14.9229 12.0164C15.908 12.0164 16.7104 12.8187 16.7104 13.8039C16.7104 14.7891 15.908 15.5914 14.9229 15.5914ZM29.7307 15.5914C28.7455 15.5914 27.9432 14.7891 27.9432 13.8039C27.9432 12.8187 28.7455 12.0164 29.7307 12.0164C30.7158 12.0164 31.5182 12.8187 31.5182 13.8039C31.5182 14.7891 30.7158 15.5914 29.7307 15.5914ZM32.9807 13.1945C32.6861 11.6609 31.3455 10.5031 29.7307 10.5031C28.8572 10.5031 28.0549 10.8484 27.4658 11.407V5.18125H28.776V8.66484C28.776 9.08125 29.1213 9.42656 29.5377 9.42656H33.7322V13.1945H32.9807Z" fill="#040458"/>
        <path d="M1.50635 2.40869H6.93994C7.35635 2.40869 7.70166 2.06338 7.70166 1.64697C7.70166 1.23057 7.35635 0.885254 6.93994 0.885254H1.50635C1.08994 0.885254 0.744629 1.23057 0.744629 1.64697C0.744629 2.06338 1.08994 2.40869 1.50635 2.40869Z" fill="#040458"/>
        <path d="M6.93975 3.65771H2.75537C2.33896 3.65771 1.99365 4.00303 1.99365 4.41943C1.99365 4.83584 2.33896 5.18115 2.75537 5.18115H6.93975C7.35615 5.18115 7.70146 4.83584 7.70146 4.41943C7.70146 4.00303 7.36631 3.65771 6.93975 3.65771Z" fill="#040458"/>
        <path d="M6.93994 6.43066H4.29932C3.88291 6.43066 3.5376 6.77598 3.5376 7.19238C3.5376 7.60879 3.88291 7.9541 4.29932 7.9541H6.93994C7.35635 7.9541 7.70166 7.60879 7.70166 7.19238C7.70166 6.77598 7.3665 6.43066 6.93994 6.43066Z" fill="#040458"/>
        <path d="M6.93994 9.20312H6.02588C5.60947 9.20312 5.26416 9.54844 5.26416 9.96484C5.26416 10.3813 5.60947 10.7266 6.02588 10.7266H6.93994C7.35635 10.7266 7.70166 10.3813 7.70166 9.96484C7.70166 9.54844 7.3665 9.20312 6.93994 9.20312Z" fill="#040458"/>
        </svg>
        ),
    },
    {
      status: "Out for Delivery",
      date: "07 Dec 2024 09:46",
      completed: false,
      icon: (<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5602 14H10.3734V12.1209H17.9229C18.2196 12.1209 18.4833 11.8572 18.4833 11.5605V8.00004C18.4833 7.70333 18.2196 7.4396 17.9229 7.4396H15.4174V5.75828C16.0437 5.00004 16.9998 3.78026 16.9998 2.98905C16.9998 1.80224 16.0437 0.846191 14.8569 0.846191C13.6701 0.846191 12.7141 1.80224 12.7141 2.98905C12.7141 3.78026 13.6701 5.033 14.2965 5.75828V8.00004C14.2965 8.29674 14.5602 8.56048 14.8569 8.56048H17.3624V11.033H9.81297C9.51627 11.033 9.25253 11.2967 9.25253 11.5934V14.5934C9.25253 14.8901 9.51627 15.1539 9.81297 15.1539H19.9998V17.7912H4.70308V16.3737C5.62616 15.3187 7.40638 13.1429 7.40638 11.8242C7.40638 10.044 5.95583 8.56048 4.14264 8.56048C2.36242 8.56048 0.878906 10.011 0.878906 11.8242C0.878906 13.1429 2.65913 15.3187 3.5822 16.3737V18.3517C3.5822 18.6484 3.84594 18.9121 4.14264 18.9121H20.5273C20.824 18.9121 21.0877 18.6484 21.0877 18.3517V14.5605C21.0877 14.2308 20.8569 14 20.5602 14ZM14.8569 2.29674C15.2525 2.29674 15.5492 2.62641 15.5492 2.98905C15.5492 3.38465 15.2196 3.68136 14.8569 3.68136C14.4613 3.68136 14.1317 3.35169 14.1317 2.98905C14.1317 2.62641 14.4613 2.29674 14.8569 2.29674ZM3.05473 11.6923C3.05473 11.066 3.54924 10.5715 4.17561 10.5715C4.80198 10.5715 5.29649 11.066 5.29649 11.6923C5.29649 12.3187 4.80198 12.8132 4.17561 12.8132C3.54924 12.7803 3.05473 12.2858 3.05473 11.6923Z" fill="#040458"/>
        </svg>
        ),
    },
    {
      status: "Delivered",
      date: "07 Dec 2024 15:46",
      completed: false,
      icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_448_2544)">
        <path d="M23.9461 1.0292C24.0007 0.892902 24.0141 0.743591 23.9846 0.599777C23.9551 0.455962 23.884 0.323968 23.7802 0.220158C23.6764 0.116349 23.5444 0.0452885 23.4006 0.0157873C23.2568 -0.0137139 23.1074 -0.000358609 22.9711 0.0541974L1.15065 8.7827H1.14915L0.471148 9.0527C0.342733 9.10392 0.230976 9.18964 0.148222 9.30039C0.0654668 9.41114 0.0149351 9.54261 0.00220827 9.68028C-0.0105185 9.81795 0.0150548 9.95645 0.0761036 10.0805C0.137152 10.2045 0.2313 10.3093 0.348148 10.3832L0.963148 10.7732L0.964648 10.7762L8.45715 15.5432L10.8421 19.2902C12.0001 21.0002 12.0001 19.5002 12.0001 18.7502C12 17.7971 12.2016 16.8547 12.5919 15.9852C12.9821 15.1156 13.5521 14.3385 14.2643 13.7051C14.9765 13.0717 15.8148 12.5963 16.7239 12.3102C17.6331 12.0241 18.5926 11.9338 19.5391 12.0452L23.9461 1.0292ZM21.1966 3.8642L9.95565 15.1052L9.63315 14.5982C9.57406 14.5052 9.49519 14.4263 9.40215 14.3672L8.89515 14.0447L20.1361 2.8037L21.9031 2.0972L21.1981 3.8642H21.1966Z" fill="#040458"/>
        <path d="M24 18.75C24 20.1424 23.4469 21.4777 22.4623 22.4623C21.4777 23.4469 20.1424 24 18.75 24C17.3576 24 16.0223 23.4469 15.0377 22.4623C14.0531 21.4777 13.5 20.1424 13.5 18.75C13.5 17.3576 14.0531 16.0223 15.0377 15.0377C16.0223 14.0531 17.3576 13.5 18.75 13.5C20.1424 13.5 21.4777 14.0531 22.4623 15.0377C23.4469 16.0223 24 17.3576 24 18.75ZM21.0105 16.2315C20.926 16.1809 20.8323 16.1474 20.7349 16.1329C20.6374 16.1185 20.5381 16.1234 20.4426 16.1473C20.347 16.1713 20.2571 16.2138 20.178 16.2726C20.0989 16.3313 20.0321 16.405 19.9815 16.4895L18.2265 19.4145L17.406 18.594C17.2652 18.4532 17.0742 18.3741 16.875 18.3741C16.6758 18.3741 16.4848 18.4532 16.344 18.594C16.2032 18.7348 16.1241 18.9258 16.1241 19.125C16.1241 19.3242 16.2032 19.5152 16.344 19.656L17.505 20.8155C17.6258 20.9366 17.7727 21.0285 17.9344 21.0843C18.0961 21.1401 18.2684 21.1582 18.4382 21.1374C18.608 21.1166 18.7708 21.0573 18.9143 20.9641C19.0577 20.8709 19.178 20.7462 19.266 20.5995L21.2685 17.2605C21.3191 17.176 21.3526 17.0823 21.3671 16.9849C21.3815 16.8874 21.3766 16.7881 21.3527 16.6926C21.3287 16.597 21.2862 16.5071 21.2274 16.428C21.1687 16.3489 21.095 16.2821 21.0105 16.2315Z" fill="#040458"/>
        </g>
        <defs>
        <clipPath id="clip0_448_2544">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        ),
    },
  ];

  const handleEditTrackingId = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveTrackingId = () => {
    setIsEditing(false);
  
    console.log("Tracking ID Updated:", trackingId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingProducts.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentData = trendingProducts[currentIndex];

  const handleApplyDiscount = () => {
    console.log("Discount Applied:", discountCode);
   
  };

  

 

  const orderSummary = {
    subtotal: 4300.0,
    discount: 100.0,
    shippingCharge: 45.0,
    estimatedTax: 0.0,
    total: 4235.0,
  };

  

  const orderItems = [
    {
      product: "Fancy Bikini",
      quantity: 2,
      price: 100.0,
      total: 200.0,
      image: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVURp718rITC3AcWL9sY7gQj1du5fVO8FnEx", 
    },
    {
      product: "Wooly Jacket",
      quantity: 2,
      price: 100.0,
      total: 200.0,
      image: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVURp718rITC3AcWL9sY7gQj1du5fVO8FnEx", 
    },
    {
      product: "Summer Dress",
      quantity: 15,
      price: 100.0,
      total: 1500.0,
      image: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVURp718rITC3AcWL9sY7gQj1du5fVO8FnEx", 
    },
    {
      product: "Beach Hat",
      quantity: 2,
      price: 100.0,
      total: 200.0,
      image: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVURp718rITC3AcWL9sY7gQj1du5fVO8FnEx", 
    },
    {
      product: "Sunglasses",
      quantity: 2,
      price: 100.0,
      total: 200.0,
      image: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVURp718rITC3AcWL9sY7gQj1du5fVO8FnEx", 
    },
    {
      product: "Sandals",
      quantity: 20,
      price: 100.0,
      total: 2000.0,
      image: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLRVURp718rITC3AcWL9sY7gQj1du5fVO8FnEx", 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-gray-100 min-h-screen">
  
    <div className="col-span-full my-4 flex items-center gap-4 text-sm">
      <button className="font-medium">
        <span className="text-gray-400">ORDERS &gt;</span> <span>ORDERDETAILS</span>
      </button>
    </div>
     <div className="w-full bg-white rounded-2xl p-6">
     
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-normal text-[#4F4F4F]">Order #VICS765</h2>
        <button className="bg-[#F5842F] text-white text-sm px-4 py-2 rounded-lg">
          Invoice
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 text-sm text-[#4F4F4F] mb-4">
        <span>PRODUCT</span>
        <span className="text-center">QUANTITY</span>
        <span className="text-right">PRICE</span>
        <span className="text-right">TOTAL AMOUNT</span>
      </div>

      <div className="space-y-4">
        {orderItems.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-center">
          
            <div className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.product}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-sm text-[#4F4F4F]">{item.product}</span>
            </div>

            <span className="text-sm text-[#4F4F4F] text-center">{item.quantity}</span>

            <span className="text-sm text-[#4F4F4F] text-right">
              ${item.price.toFixed(2)}
            </span>

            <span className="text-sm text-[#4F4F4F] text-right">
              ${item.total.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  
      <div className="w-full bg-white rounded-2xl p-6 h-fit">
        <h2 className="text-2xl font-normal text-[#4F4F4F] mb-6">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-[#4F4F4F]">
            <span>SUBTOTAL:</span>
            <span>${orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#4F4F4F]">
            <span>DISCOUNT:</span>
            <span>-${orderSummary.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#4F4F4F]">
            <span>SHIPPING CHARGE:</span>
            <span>${orderSummary.shippingCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#4F4F4F]">
            <span>ESTIMATED TAX:</span>
            <span>${orderSummary.estimatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#4F4F4F]">
            <span>TOTAL (USD):</span>
            <span className="font-semibold">${orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            placeholder="Enter Discount"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded-lg text-sm text-[#4F4F4F]"
          />
          <button
            onClick={handleApplyDiscount}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#F5842F] text-white text-sm px-4 py-1 rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
     
        <div className="w-full bg-white rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-normal text-[#4F4F4F] mb-4">Comment</h2>
          <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-lg p-3">
            <textarea
              placeholder="Say something....."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-transparent text-sm text-[#A8A6A6] focus:outline-none"
            />
          </div>
          {/* <button
            onClick={handleCommentSubmit}
            className="mt-4 bg-[#F5842F] text-white text-sm px-4 py-2 rounded-lg"
          >
            Submit Comment
          </button> */}
        </div>

        <div className="w-full bg-white rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-normal text-[#4F4F4F] mb-4">Shipping Information</h2>
          <p className="text-sm text-[#4F4F4F]">
            NAME: Vera <br />
            ADDRESS: 19th dema street, Dubai <br />
            PHONE NUMBER: +971 456 444 566 <br />
            EMAIL ADDRESS: vera@gmail.com
          </p>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl p-6">
   
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-normal text-[#040458]">Order Tracking</h2>
          {isEditing ? (
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="text-sm text-[#4F4F4F] mt-1 p-1 border border-gray-300 rounded"
            />
          ) : (
            <p className="text-sm text-[#4F4F4F] mt-1">TRACKING ID: {trackingId}</p>
          )}
        </div>
        <button
          onClick={isEditing ? handleSaveTrackingId : handleEditTrackingId}
          className="bg-[#D9D9D9] text-[#040458] text-sm px-3 py-1 rounded-lg flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.3335H14" stroke="#040458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87436C13.2355 4.04594 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z" stroke="#040458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
{isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="space-y-8 relative">
        {orderTimeline.map((step, index) => (
          <div key={index} className="flex items-center gap-4 relative">
          
            {index > 0 && (
              <div
                className={`absolute left-[27px] top-[-30px] h-[30px] w-[2px] ${
                  step.completed ? "bg-[#038444]" : "bg-[#D9D9D9]"
                }`}
              ></div>
            )}

            <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#040458] rounded-lg">
              <span className="text-xl">{step.icon}</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#040458]">{step.status}</p>
              <p className="text-xs text-[#4F4F4F]">{step.date}</p>
            </div>

            <div className="overflow-hidden">
                <div
              className="absolute left-[185px] right-[22px] top-[50%] transform -translate-y-1/2"
              style={{
                borderTop: `2px dashed ${step.completed ? "#038444" : "#D9D9D9"}`,
              }}
            ></div>
            </div>
            

            {step.completed && (
              <div className="absolute right-0">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#038444"
                  />
                  <path
                    d="M16 9L10.5 14.5L8 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

 
      <div className="flex flex-col md:flex-row gap-3">
    
        <div className="w-full bg-white rounded-2xl p-6">
          <h2 className="text-lg font-normal text-[#4F4F4F] mb-4">Payment Details</h2>
          <p className="text-sm text-[#4F4F4F]">
            TRANSACTION: VICSH47245438 <br />
            PAYMENT METHOD: Debit Card <br />
            CARD HOLDER NAME: Vera <br />
            CARD NUMBER: xxxx xxxx xxxx 1234
          </p>
        </div>

   
        <div className="relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden shadow-lg">
       
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            style={{ backgroundImage: `url(${currentData.image})` }}
          ></div>

          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

          <div className="relative z-10 p-5 flex flex-col justify-between h-full">
            <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide">Trending now</h3>
            <div className="mt-auto">
              <p className="text-white font-medium text-md sm:text-lg">{currentData.title}</p>
              <p className="text-white text-sm sm:text-base opacity-90">{currentData.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}