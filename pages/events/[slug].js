import styles from "@/styles/Event.module.css";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { FaPenAlt, FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  console.log(evt);
  const { attributes } = evt[0];
  console.log(attributes);
  const { image } = attributes;
  const imageData = image.data.attributes;

  const medium = imageData.formats.thumbnail.url;
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${evt[0].id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  console.log(evt[0]);

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt[0].id}`}>
            <a href="">
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(attributes.date).toLocaleDateString("en-US")} at{" "}
          {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        <ToastContainer />
        {attributes.image && (
          <div className={styles.image}>
            <Image src={medium} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{attributes.performers}</p>
        <h3>Description:</h3>
        <p>{attributes.description}</p>
        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

        {/* <EventMap attributes={attributes} /> */}

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({ params: { slug: evt.slug } }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events?slug=${slug}`);
//   const events = await res.json();
//   console.log(events);

//   return {
//     props: { event: events[0] },
//   };
//   revalidate: 1;
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug]=${slug}&populate=*`
  );

  const events = await res.json();

  return {
    props: {
      evt: events.data,
    },
  };
}
