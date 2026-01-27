import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

interface UserCardProps {
  currentUser?: UserResponse;
  isFetching: boolean;
}

const UserCard = ({ currentUser, isFetching }: UserCardProps) => {
  if (isFetching || !currentUser) {
    return <div className="size-8 rounded-lg bg-muted animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="size-8 rounded-lg">
        <AvatarImage
          src={currentUser.image?.url}
          alt={currentUser.displayName}
        />
        <AvatarFallback className="rounded-lg uppercase">
          {currentUser.firstName.charAt(0)}
          {currentUser.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{currentUser?.displayName}</span>
        <span className="text-muted-foreground truncate text-xs">
          {currentUser?.email}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
