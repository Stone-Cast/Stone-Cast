import Image from "next/image";

const cardInfos = [
    {
        front: "/picFrame.jpg",
        back: "../public/picFrame.jpg",
        title: "Card1",
    },
    {
        front: "/picFrame.jpg",
        back: "../public/picFrame.jpg",
        title: "Card2",
    },
    {
        front: "/picFrame.jpg",
        back: "../public/picFrame.jpg",
        title: "Card3",
    },
    {
        front: "/picFrame.jpg",
        back: "../public/picFrame.jpg",
        title: "Card4",
    },
    {
        front: "/picFrame.jpg",
        back: "../public/picFrame.jpg",
        title: "Card5",
    },
    {
        front: "/picFrame.jpg",
        back: "../public/picFrame.jpg",
        title: "Card6",
    },
];

export default function Carousel() {
    return (
        <div className="flex gap-4">
            {cardInfos.map(({ front, back, title }, index) => (
                <Card front={front} back={back} title={title} key={index} />
            ))}
        </div>
    );
}

function Card({
    front,
    back,
    title,
}: {
    front: string;
    back: string;
    title: string;
}) {
    return (
        <div className="relative h-[120px] w-[120px]">
            <Image
                src={front}
                alt="front_image"
                fill
                objectFit="cover"
                className="absolute"
            />
        </div>
    );
}
