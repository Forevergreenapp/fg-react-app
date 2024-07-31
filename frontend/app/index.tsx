import { useRootNavigationState, Redirect } from "expo-router";

const debugMode = true;

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  if (debugMode) {
    return <Redirect href={"/_sitemap"} />;
  } else {
    // todo: add better logic here
    return <Redirect href={"/get-started"} />;
  }
}
