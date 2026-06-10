import React from "react";
import Ctabutton from "./ctabutton";
import Highlighttext from "./highlighttext";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
function CodeBlocks({
  position,
  heading,
  subheading,
  ctabutton1,
  ctabutton2,
  codeblock,
  background,
  codecolor,
  btnText,
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [pos1, setPos1] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setPos({ x: x * 100, y: y * 100 });

    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;

    setTilt({ x: rotateX, y: rotateY });
  };
  const handleMouseMove1 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setPos1({ x: x * 100, y: y * 100 });
    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;

    setTilt1({ x: rotateX, y: rotateY });
  };
  return (
    <div
  className={`flex ${
    position === "right" ? "flex-row-reverse" : "flex-row"
  } my-6 justify-between gap-10`}
>
      {/* {section1} */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative w-[50%] flex flex-col gap-8 bg-[#000814] p-4 rounded-3xl overflow-hidden transition-transform duration-200"
        style={{
          transform: `
    perspective(1000px)
    rotateX(${tilt.x}deg)
    rotateY(${tilt.y}deg)
    scale(1.02)
  `,
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* 🔥 Glow */}
        <div
          className="absolute z-0 w-52 h-52 bg-linear-to-r from-blue-400 to-purple-500 rounded-full blur-[100px] opacity-30 pointer-events-none"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "all 0.08s linear",
          }}
        />
        <div className="relative z-10 flex flex-col gap-8">
          {heading}

          <div className="text-[#838894] font-bold">{subheading}</div>

          <div className="flex gap-7 mt-7">
            <Ctabutton active={ctabutton1.active} linkto={ctabutton1.linkto}>
              <div className="flex gap-2 items-center">
                {ctabutton1.btnText}
                <FaArrowRight />
              </div>
            </Ctabutton>

            <Ctabutton active={ctabutton2.active} linkto={ctabutton2.linkto}>
              {ctabutton2.btnText}
            </Ctabutton>
          </div>
        </div>
      </div>

      <div
        onMouseMove={handleMouseMove1}
        onMouseLeave={() => setTilt1({ x: 0, y: 0 })}
        className="relative h-fit flex flex-row w-1/2 text-2xl py-4 overflow-hidden rounded-2xl"
        style={{
          transform: `
    perspective(1000px)
    rotateX(${tilt1.x}deg)
    rotateY(${tilt1.y}deg)
    scale(1.02)
  `,
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* 🔥 Glow */}
        <div
          className="absolute z-0 w-64 h-64 bg-linear-to-r from-blue-400 to-purple-500 rounded-full blur-[100px] opacity-25 pointer-events-none"
          style={{
            left: `${pos1.x}%`,
            top: `${pos1.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "all 0.08s linear",
          }}
        />

        {/* ✅ Content wrapper */}
        <div className="relative z-10 flex flex-row w-full">
          {/* Line Numbers */}
          <div className="text-center flex flex-col w-[10%] text-[#6E727F] font-semibold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
          </div>

          {/* Code */}
          <div className={`w-[90%] flex flex-col font-medium ${codecolor}`}>
            <TypeAnimation
              sequence={[codeblock, 1000, ""]}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CodeBlocks;
