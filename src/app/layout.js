import './globals.css';

export const metadata = {
  title: 'Diabetes AI Healthcare Intelligence | Next.js & FastAPI',
  description: 'Empower clinical decision-making with advanced Gradient Boosting machine learning.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
