import { ReactNode } from 'react';

interface ModulesLayoutProps {
  children: ReactNode; 
}

export default function ModulesLayout({
  children, 
}: ModulesLayoutProps): JSX.Element {
  return <div>{children}</div>;
}
