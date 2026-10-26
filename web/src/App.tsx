import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { useRoute } from "./router";
import { Home } from "./screens/Home";
import { LessonScreen } from "./screens/LessonScreen";
import { Errors } from "./screens/Errors";
import { Glossary } from "./screens/Glossary";
import { Review } from "./screens/Review";
import { Practice } from "./screens/Practice";
import { loadEngine } from "./py/engine";

const TITLES: Record<string, string> = {
  home: "Dojo",
  lesson: "Lesson",
  errors: "Error Encyclopedia",
  glossary: "Glossary",
  review: "Review",
  practice: "Practice",
};

export function App() {
  const route = useRoute();
  useEffect(() => {
    const t = setTimeout(loadEngine, 100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.title = "Py Dojo · " + (TITLES[route.name] ?? "");
    if (route.name !== "lesson") window.scrollTo(0, 0);
  }, [route.name]);
  return (
    <Layout route={route}>
      {route.name === "home" && <Home />}
      {route.name === "lesson" && <LessonScreen id={route.id} stage={route.stage} />}
      {route.name === "errors" && <Errors q={route.q} />}
      {route.name === "glossary" && <Glossary q={route.q} />}
      {route.name === "review" && <Review />}
      {route.name === "practice" && <Practice id={route.id} />}
    </Layout>
  );
}
