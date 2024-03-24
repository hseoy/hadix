import appInfo from '@app-info';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Separator,
} from '@radix-ui/themes';

export const GlobalHeader = () => {
  return (
    <Flex
      px="5"
      align="center"
      justify="between"
      height="var(--space-8)"
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--gray-4)',
      }}
    >
      <Flex gap="2" align="center">
        <Heading size="4">{appInfo.name}</Heading>
        <Badge variant="outline">{appInfo.release}</Badge>
      </Flex>

      <Flex align="center" gap="4">
        <Button variant="ghost">Sign Up</Button>
        <Button>Log In</Button>

        <Separator orientation="vertical" />

        <Link
          href="https://github.com/hseoy/hadix"
          aria-label="Github Link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center">
            <IconButton variant="ghost" color="gray">
              <GitHubLogoIcon width="17" height="17" />
            </IconButton>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};
