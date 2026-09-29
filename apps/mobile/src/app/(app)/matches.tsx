import { EmptyState, Screen } from '@/components';

export default function MatchesScreen() {
  return (
    <Screen>
      <EmptyState
        title="No matches yet"
        description="When the matching engine is connected, compatible skill pairs will show here."
      />
    </Screen>
  );
}
