import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated && !["/login", "/signup"].includes(pathname)) {
      router.replace("/login");
    } else {
      router.push("/form");
    }
  }, [pathname, router]);
};

export default useAuthRedirect;
