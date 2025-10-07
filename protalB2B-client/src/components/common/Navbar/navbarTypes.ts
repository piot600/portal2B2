export interface NavSubLink {
  to: string;
  label: string;
}

export interface NavCategory {
  label: string;
  links: NavSubLink[];
}

export interface NavCategoryProps {
  category: {
    label: string;
    links: { to: string; label: string }[];
  };
  isOpen: boolean;
  onToggle: (label: string) => void;
  onClose: () => void;
}

export interface UserMenuProps {
  email: string;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  onClose: () => void;
}
