import { redirect } from "next/navigation";

export const metadata = {
  title: "Vino | Blog ",
  description: "Welcome to vino's blog",
};

export default function BlogPage() {
  redirect("blog/order_by_tag")
}
