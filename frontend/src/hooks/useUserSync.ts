import { useAuth, useUser } from "@clerk/react";
import { syncUser } from "../lib/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    isPending,
    isSuccess,
    mutate: syncUserMutation,
  } = useMutation({
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      const email = user.primaryEmailAddress?.emailAddress;
      const name = user.fullName || user.firstName;

      if (!email || !name) return;

      syncUserMutation({
        id: user.id,
        email,
        name,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, syncUserMutation, isPending, isSuccess]);

  return { isSynced: isSuccess };
};

export default useUserSync;
