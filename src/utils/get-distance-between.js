export async function getDistanceBetween({ origin, destination }) {
  try {
    // * THROW ERROR IF NO ORIGIN OR DESTINATION
    if (!origin || !destination) {
      throw new Error("Origin or destination not provided");
    }

    // const encodedOrigin = encodeURI(origin);
    // const encodedDestination = encodeURI(destination);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&units=metric&key=AIzaSyDtWV8-aY2ZK1fdW8J4FOcOkyocWAXXMOs`;
    const res = await fetch(url);
    const data = await res.json();

    // * THROW ERROR IF NO DATA
    if (
      !data ||
      !data.rows ||
      !data.rows[0] ||
      !data.rows[0].elements ||
      !data.rows[0].elements[0]
    ) {
      throw new Error("Something went wrong");
    }
    const distance = data.rows[0].elements[0].distance.text;
    return {
      distance,
      duration: data.rows[0].elements[0].duration.text,
      status: "SUCCESS",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "ERROR",
      distance: null,
      duration: null,
    };
  }
}
