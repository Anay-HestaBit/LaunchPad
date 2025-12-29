import Image from 'next/image';
export default function InnerCard({ name, Project, img }) {
  const src = img?.startsWith('/') ? img : `/${img}`;
  return (
    <div className="text-black h-97.5 w-92.5 t-[902.5px] l-[319px] ml-4 mt-5 transition-transform transition-200 hover:-translate-y-2">
      <Image src={src} width={370} height={191} alt="name"></Image>
      <div className="h-[141.5px] w-87.5 t-[1114px] l-[328px]">
        <p className="text-sm text-[#A0AEC0] mt-4">{Project}</p>
        <h1 className="font-extrabold text-2xl">{name}</h1>
        <p className="text-md text-[#A0AEC0] mt-4">
          As Uber works through a huge amount of internal management turmoil.
        </p>
        <div className="flex justify-between items-center ">
          <button className="border-2 border-[#4FD1C5] rounded-2xl text-[#4FD1C5] mt-4 text-sm font-bold p-3 pl-8 pr-8">
            VIEW ALL
          </button>
          <Image
            src="/profilePage/image.png"
            alt="Profile"
            width={59}
            height={23}
            className="t-[1226.5px] l-[621px]"
          />
        </div>
      </div>
    </div>
  );
}
