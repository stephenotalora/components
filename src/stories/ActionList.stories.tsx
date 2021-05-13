import {
  ServerIcon,
  PlusCircleIcon,
  TypographyIcon,
  VersionsIcon,
  SearchIcon,
  NoteIcon,
  ProjectIcon,
  FilterIcon,
  GearIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@primer/octicons-react'
import {Meta} from '@storybook/react'
import React from 'react'
import styled from 'styled-components'
import {Label, ThemeProvider} from '..'
import {ActionList as _ActionList} from '../ActionList'
import {Header} from '../ActionList/Header'
import BaseStyles from '../BaseStyles'
import sx from '../sx'

const ActionList = Object.assign(_ActionList, {
  Header
})

const meta: Meta = {
  title: 'Composite components/ActionList',
  component: ActionList,
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <ThemeProvider>
        <BaseStyles>
          <Story />
        </BaseStyles>
      </ThemeProvider>
    )
  ],
  parameters: {
    controls: {
      disable: true
    }
  }
}
export default meta

const ErsatzOverlay = styled.div`
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(149, 157, 165, 0.2);
  position: absolute;
  min-width: 192px;
  max-width: 640px;
`

export function ActionsStory(): JSX.Element {
  return (
    <>
      <h1>Actions</h1>
      <ErsatzOverlay>
        <ActionList
          showItemDividers
          items={[
            {
              leadingVisual: ServerIcon,
              text: 'Open current Codespace',
              description:
                "Your existing Codespace will be opened to its previous state, and you'll be asked to manually switch to new-branch.",
              descriptionVariant: 'block'
            },
            {
              leadingVisual: PlusCircleIcon,
              text: 'Create new Codespace',
              description: 'Create a brand new Codespace with a fresh image and checkout this branch.',
              descriptionVariant: 'block'
            }
          ]}
        />
      </ErsatzOverlay>
    </>
  )
}
ActionsStory.storyName = 'Actions'

export function SimpleListStory(): JSX.Element {
  return (
    <>
      <h1>Simple List</h1>
      <ErsatzOverlay>
        <ActionList
          items={[
            {text: 'New file', showDivider: true},
            ActionList.Divider,
            {text: 'Copy link', showDivider: true},
            {text: 'Edit file', showDivider: true},
            {text: 'Delete file', variant: 'danger', showDivider: true}
          ]}
        />
      </ErsatzOverlay>
    </>
  )
}
SimpleListStory.storyName = 'Simple List'

const selectListItems = new Array(6).fill(undefined).map((_, i) => {
  return {
    text: `Item ${i}`,
    id: i
  }
})

export function SingleSelectListStory(): JSX.Element {
  return (
    <>
      <h1>Single Select List</h1>
      <ErsatzOverlay>
        <ActionList
          items={selectListItems.map((item, index) => ({
            ...item,
            selected: index === 1
          }))}
        />
      </ErsatzOverlay>
    </>
  )
}
SingleSelectListStory.storyName = 'Single Select'

export function MultiSelectListStory(): JSX.Element {
  return (
    <>
      <h1>Multi Select List</h1>
      <ErsatzOverlay>
        <ActionList
          selectionVariant="multiple"
          items={selectListItems.map((item, index) => ({
            ...item,
            selected: index === 1 || index === 3
          }))}
        />
      </ErsatzOverlay>
    </>
  )
}
MultiSelectListStory.storyName = 'Multi Select'

export function ComplexListInsetVariantStory(): JSX.Element {
  const StyledDiv = styled.div`
    ${sx}
  `
  return (
    <>
      <h1>Complex List</h1>
      <h2>Inset Variant</h2>
      <ErsatzOverlay>
        <ActionList
          groupMetadata={[
            {groupId: '0'},
            {groupId: '1', header: {title: 'Live query', variant: 'filled'}},
            {groupId: '2', header: {title: 'Layout', variant: 'subtle'}, showItemDividers: true},
            {groupId: '3', renderItem: props => <ActionList.Item style={{fontWeight: 'bold'}} {...props} />},
            {
              groupId: '4',
              renderItem: ({leadingVisual: LeadingVisual, ...props}) => (
                <ActionList.Item
                  {...props}
                  leadingVisual={() => (
                    <StyledDiv sx={{'&>svg': {fill: 'white'}}}>
                      {LeadingVisual && <LeadingVisual></LeadingVisual>}
                    </StyledDiv>
                  )}
                />
              ),
              renderGroup: ({sx: sxProps, ...props}) => (
                <ActionList.Group {...props} sx={{...sxProps, backgroundColor: 'cornflowerblue', color: 'white'}} />
              )
            }
          ]}
          items={[
            {leadingVisual: TypographyIcon, text: 'Rename', groupId: '0'},
            {
              leadingVisual: VersionsIcon,
              text: 'Duplicate',
              description: 'Create a copy',
              descriptionVariant: 'inline',
              groupId: '0'
            },
            {
              leadingVisual: SearchIcon,
              text: 'repo:github/memex,github/github',
              groupId: '1',
              renderItem: props => <ActionList.Item style={{color: 'rebeccapurple'}} {...props} />
            },
            {
              leadingVisual: NoteIcon,
              text: 'Table',
              description: 'Information-dense table optimized for operations across teams',
              descriptionVariant: 'block',
              groupId: '2'
            },
            {
              leadingVisual: ProjectIcon,
              text: 'Board',
              description: 'Kanban-style board focused on visual states',
              descriptionVariant: 'block',
              groupId: '2'
            },
            {
              leadingVisual: FilterIcon,
              text: 'Save sort and filters to current view',
              groupId: '3'
            },
            {leadingVisual: FilterIcon, text: 'Save sort and filters to new view', groupId: '3'},
            {leadingVisual: GearIcon, text: 'View settings', groupId: '4'}
          ]}
        />
      </ErsatzOverlay>
    </>
  )
}
ComplexListInsetVariantStory.storyName = 'Complex List — Inset Variant'

export function ComplexListFullVariantStory(): JSX.Element {
  const StyledDiv = styled.div`
    ${sx}
  `
  return (
    <>
      <h1>Complex List</h1>
      <h2>Full Variant</h2>
      <ErsatzOverlay>
        <ActionList
          variant="full"
          groupMetadata={[
            {groupId: '0'},
            {groupId: '1', header: {title: 'Live query', variant: 'filled'}},
            {groupId: '2', header: {title: 'Layout', variant: 'subtle'}},
            {groupId: '3', renderItem: props => <ActionList.Item style={{fontWeight: 'bold'}} {...props} />},
            {
              groupId: '4',
              renderItem: ({leadingVisual: LeadingVisual, ...props}) => (
                <ActionList.Item
                  {...props}
                  leadingVisual={() => (
                    <StyledDiv sx={{'&>svg': {fill: 'white'}}}>
                      {LeadingVisual && <LeadingVisual></LeadingVisual>}
                    </StyledDiv>
                  )}
                />
              ),
              renderGroup: ({sx: sxProps, ...props}) => (
                <ActionList.Group {...props} sx={{...sxProps, backgroundColor: 'cornflowerblue', color: 'white'}} />
              )
            }
          ]}
          items={[
            {leadingVisual: TypographyIcon, text: 'Rename', groupId: '0'},
            {leadingVisual: VersionsIcon, text: 'Duplicate', groupId: '0'},
            {
              leadingVisual: SearchIcon,
              text: 'repo:github/memex,github/github',
              groupId: '1',
              renderItem: props => <ActionList.Item style={{color: 'rebeccapurple'}} {...props} />
            },
            {
              leadingVisual: NoteIcon,
              text: 'Table',
              description: 'Information-dense table optimized for operations across teams',
              descriptionVariant: 'block',
              groupId: '2'
            },
            {
              leadingVisual: ProjectIcon,
              text: 'Board',
              description: 'Kanban-style board focused on visual states',
              descriptionVariant: 'block',
              groupId: '2'
            },
            {
              leadingVisual: FilterIcon,
              text: 'Save sort and filters to current view',
              groupId: '3'
            },
            {leadingVisual: FilterIcon, text: 'Save sort and filters to new view', groupId: '3'},
            {leadingVisual: GearIcon, text: 'View settings', groupId: '4'}
          ]}
        />
      </ErsatzOverlay>
    </>
  )
}
ComplexListFullVariantStory.storyName = 'Complex List — Full Variant'

export function HeaderStory(): JSX.Element {
  return (
    <>
      <h1>Header</h1>
      <h2>Filled Variant</h2>
      <ActionList.Header title="Layout" variant="filled" />
      <h2>Subtle Variant</h2>
      <ActionList.Header title="Layout" variant="subtle" />
    </>
  )
}
HeaderStory.storyName = 'Header'

export function CustomItemChildren(): JSX.Element {
  return (
    <>
      <h1>Custom Item Children</h1>
      <ErsatzOverlay>
        <ActionList
          items={[
            {
              leadingVisual: ArrowRightIcon,
              children: (
                <Label outline borderColor="border.success">
                  Choose this one
                </Label>
              ),
              trailingIcon: ArrowLeftIcon
            }
          ]}
        />
      </ErsatzOverlay>
    </>
  )
}
CustomItemChildren.storyName = 'Custom Item Children'
