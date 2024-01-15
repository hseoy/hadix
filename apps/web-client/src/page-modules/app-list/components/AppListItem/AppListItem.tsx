import { Stack, Typography } from '~/modules/common';
import { ItemCard } from '~/modules/common/components/ItemCard/ItemCard';

export interface AppListItemProps {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
  mainOwnerId: string;
  mainOwnerName: string;
  previewUrl?: string;
  deploymentStatus?: 'DEPLOYED' | 'DEPLOYING' | 'FAILED' | 'UNDEPLOYED';
  resolution?: { width: number; height: number };
  deviceType?: 'MOBILE' | 'TABLET' | 'DESKTOP';
}

export const AppListItem = ({
  id,
  name,
  createdAt,
  lastModifiedAt,
  createdBy,
  lastModifiedBy,
  mainOwnerId,
  mainOwnerName,
  previewUrl,
  deploymentStatus,
  resolution,
  deviceType,
}: AppListItemProps) => {
  return (
    <Stack>
      <div style={{ margin: '10px' }}>
        <ItemCard
          title={name}
          author={mainOwnerName}
          createdAt={createdAt}
          modifiedAt={lastModifiedAt}
          thumbnail={previewUrl}
          thumbnailSize={{ width: 320, height: 180 }}
          renderHover={() => <Typography>Hover</Typography>}
        />
      </div>
    </Stack>
  );
};
