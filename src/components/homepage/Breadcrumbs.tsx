import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Heart, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentPage?: string;
}

const Breadcrumbs = ({ currentPage = 'Home' }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Home className="w-3 h-3" />
            <span className="hidden sm:inline">Valentine App</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Heart className="w-3 h-3 text-primary/50" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-foreground font-medium">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
