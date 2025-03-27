import Link from 'next/link';
import CustomLink from '@/components/CustomLink';

const HomePage = () => (
    <Link href="/about" passHref legacyBehavior>
        <CustomLink>Go to About Page</CustomLink>
    </Link>
);

export default HomePage;