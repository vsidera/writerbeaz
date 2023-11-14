export function Card({ image, name, title, paragraph, margin }) {
    return (
        <div className={`w-80 h-fit bg-white p-6 shadow-lg rounded-[45px] ${margin}`}>
            <img src={image} alt="Profile" className="rounded-full"/>
            <p className="text-purple-500 text-2xl font-bold">{name}</p>
            <p className="text-purple-500 text-lg">{title}</p>
            <p className="text-[rgb(114,114,114)] pt-6">{paragraph}</p>
        </div>
    )
}