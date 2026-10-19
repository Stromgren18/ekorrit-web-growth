import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useBlocker } from "@tanstack/react-router";
import { bekraftaLamna } from "@/lib/admin/navigation";

type Editor = { dirty: boolean; discard: () => void; overview?: () => void };
type Navigation = {
  register: (editor: () => Editor) => () => void;
  confirmLeave: () => boolean;
  overview: () => void;
};
const Context = createContext<Navigation | null>(null);

export function AdminNavigationProvider({ children }: { children: ReactNode }) {
  const editor = useRef<(() => Editor) | null>(null);
  const navigation = useRef<Navigation>({
    register: (getEditor) => {
      editor.current = getEditor;
      return () => { if (editor.current === getEditor) editor.current = null; };
    },
    confirmLeave: () => {
      const current = editor.current?.();
      const allowed = bekraftaLamna(current?.dirty ?? false, () =>
        window.confirm("Du har osparade ändringar. Vill du lämna sidan ändå? Osparade ändringar går förlorade."),
      );
      if (allowed) current?.discard();
      return allowed;
    },
    overview: () => {
      const current = editor.current?.();
      if (navigation.current.confirmLeave()) current?.overview?.();
    },
  });
  useBlocker({
    shouldBlockFn: () => !navigation.current.confirmLeave(),
    enableBeforeUnload: () => editor.current?.().dirty ?? false,
  });
  return <Context.Provider value={navigation.current}>{children}</Context.Provider>;
}

export function useAdminNavigation() {
  const context = useContext(Context);
  if (!context) throw new Error("Admin navigation requires its provider");
  return context;
}

export function useAdminEditor(editor: Editor) {
  const { register } = useAdminNavigation();
  const latest = useRef(editor);
  latest.current = editor;
  useEffect(() => register(() => latest.current), [register]);
}