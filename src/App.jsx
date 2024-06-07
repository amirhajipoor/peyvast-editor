import { useRef, useState } from "react";
import "./App.css";
import domtoimage from "dom-to-image";

export default function App() {
	const imageRef = useRef(null);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [scale, setScale] = useState(1); // State for scaling
	const [title, setTitle] = useState("دکتر علیرضا زاکانی");
	const [link, setLink] = useState("");
	const [body, setBody] = useState('لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه...')

	function convert() {
		const node = document.querySelector("#box");

		domtoimage
			.toPng(node)
			.then(function (url) {
				const a = document.createElement('a')
				a.href = url;
				a.setAttribute('download', 'file.jpg')
				document.body.appendChild(a)
				a.click();
				a.remove();

			})
			.catch(function (error) {
				console.error("oops, something went wrong!", error);
			});
	}

	function move(dir) {
		if (dir === "top") {
			setY((prevY) => prevY - 1); // Move up by 1rem
		} else if (dir === "bottom") {
			setY((prevY) => prevY + 1); // Move down by 1rem
		} else if (dir === "left") {
			setX((prevX) => prevX - 1); // Move left by 1rem
		} else if (dir === "right") {
			setX((prevX) => prevX + 1); // Move right by 1rem
		}
	}

	function scaleImage(factor) {
		setScale((prevScale) => prevScale * factor); // Scale image by factor
	}

	function handleImage(e) {
		const file = e.target.files[0];
		const url = URL.createObjectURL(file);
		imageRef.current.src = url;
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<div
				id="box"
				className="relative aspect-square flex items-end p-16 w-[1080px] max-w-[1080px] overflow-hidden" // Added overflow-hidden
			>
				{/* <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent z-20"></div> */}
				<div className="absolute inset-0 z-20" style={{ backgroundImage: 'url("/texture.png")' }}></div>
				<img
					loading="lazy"
					ref={imageRef}
					style={{
						transform: `translate(${x}rem, ${y}rem) scale(${scale})`,
						transformOrigin: "center",
					}} // Apply scaling and transform-origin
					className="absolute inset-0 object-cover object-center w-[1080px] aspect-square z-10 overflow-hidden"
					src="./img.jpg"
					alt=""
				/>
				<div className="z-30 left-16 bottom-16 absolute text-white">
					<span className="text-3xl font-bold">Peyvast_tv</span>
				</div>

				<img
					src="/logo.png"
					className="w-40 z-30 right-16 top-0 absolute"
					alt=""
				/>

				<div className="z-50 mb-14">
					<h1 className="text-bold text-[#82b5f9] text-4xl font-bold">
						{title}
					</h1>
					<p className="font-extrabold text-5xl leading-[4.6rem] text-body mt-4">
						{body}
					</p>
				</div>
			</div>

			<div className="mt-4 px-4 space-y-3">
				<div className="space-y-3">
					<div>
						<label className="block" htmlFor="">
							آپلود عکس
						</label>
						<input
							className="mt-1"
							onChange={handleImage}
							type="file"
							name=""
							id=""
						/>
					</div>
					<div>
						<label htmlFor="" className="block">
							عنوان
						</label>
						<textarea
							onChange={(e) => setTitle(e.target.value)}
							className="input"
							type="text"
							value={title}
						></textarea>
					</div>
					<div>
						<label htmlFor="" className="block">
							متن
						</label>
						<textarea
							onChange={(e) => setBody(e.target.value)}
							rows={7}
							className="input"
							type="text"
							value={body}
						></textarea>
					</div>
				</div>
				<div className="flex gap-x-2">
					<button onClick={() => move("top")} className="btn-primary">
						بالا
					</button>
					<button onClick={() => move("bottom")} className="btn-primary">
						پایین
					</button>
					<button onClick={() => move("right")} className="btn-primary">
						راست
					</button>
					<button onClick={() => move("left")} className="btn-primary">
						چپ
					</button>
				</div>

				<div className="flex gap-x-2">
					<button onClick={() => scaleImage(1.1)} className="btn-primary">
						بزرگ‌‌ نمایی
					</button>
					<button onClick={() => scaleImage(0.9)} className="btn-primary">
						کوچک نمایی
					</button>
				</div>

				<div>
					<button onClick={convert} className="btn-primary">
						دریافت عکس
					</button>
				</div>

				{link && (
					<div>
						<a className="underline text-lg text-sky-600" href={link}>لینک دانلود عکس</a>
					</div>
				)}
			</div>
		</div>
	);
}
