import { DefaultTheme } from 'shared/types';

export function useEditLink(
  editLink: DefaultTheme.EditLink,
  relativePagePath: string
) {
  if (!editLink) {
    return null;
  }
  const { text, pattern } = editLink;
  const link = pattern.replace(':path', relativePagePath);

  return {
    text,
    link
  };
}
