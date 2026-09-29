import { EmptyState, Screen } from '@/components';

export default function ChatScreen() {
  return (
    <Screen>
      <EmptyState
        title="No conversations"
        description="Chat threads with your swap partners will appear here."
      />
    </Screen>
  );
}
