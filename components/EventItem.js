import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  const { attributes } = evt;
  const { image } = attributes;
  const imageData = image.data.attributes;
  const thumbnail = imageData.formats.thumbnail.url;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={attributes.image ? thumbnail : "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          <span>
            {new Date(attributes.date).toLocaleDateString("en-US")} at{" "}
            {attributes.time}
          </span>
        </span>
        <h3>{attributes.name} </h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${attributes.slug}`}>
          <a className="btn">event</a>
        </Link>
      </div>
    </div>
  );
}
