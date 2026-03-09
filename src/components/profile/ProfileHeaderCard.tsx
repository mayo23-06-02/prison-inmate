// src/components/profile/ProfileHeaderCard.tsx
import { Avatar, Badge, Card, IconButton, Typography } from "@/components/ui";
import { Pencil } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface ProfileHeaderCardProps {
  visitorName: string;
  visitorId: string;
  isVerified: boolean;
  avatarInitials?: string;
  avatarSource?: string | null;
  onEditPress?: () => void;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  visitorName,
  visitorId,
  isVerified,
  avatarInitials,
  avatarSource,
  onEditPress,
}) => {
  return (
    <Card variant="highlight" padding="lg" className="relative">
      {/* Edit button - absolute positioned */}
      {onEditPress && (
        <IconButton
          icon={<Pencil size={20} color="#008400" />}
          onPress={onEditPress}
          className="absolute top-4 right-4"
          variant="ghost"
          size="sm"
        />
      )}

      <View className="items-center">
        <Avatar
          size="xl"
          src={avatarSource}
          initials={avatarInitials || visitorName.charAt(0)}
          className="mb-3"
        />
        <Typography variant="heading-lg" color="gray-900" className="mb-1">
          {visitorName}
        </Typography>
        <View className="flex-row items-center mb-2">
          <Typography variant="body-sm" color="gray-500" className="mr-2">
            ID: {visitorId}
          </Typography>
          <Badge
            label={isVerified ? "Verified" : "Pending"}
            variant={isVerified ? "success" : "warning"}
            rounded="full"
          />
        </View>
      </View>
    </Card>
  );
};
