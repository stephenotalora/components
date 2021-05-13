import React, {KeyboardEventHandler, useCallback, useMemo, useRef} from 'react'
import {GroupedListProps, ListPropsBase} from '../ActionList/List'
import TextInput from '../TextInput'
import Box from '../Box'
import SelectMenu from '../SelectMenu'
import {ActionList} from '../ActionList'
import {useFocusZone} from '../hooks/useFocusZone'
import {uniqueId} from '../utils/uniqueId'
import {itemActiveDescendantClass} from '../ActionList/Item'

export interface FilteredActionListProps extends Partial<Omit<GroupedListProps, keyof ListPropsBase>>, ListPropsBase {
  loading?: boolean
  placeholderText: string
  filterValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => unknown
}

export function FilteredActionList({
  loading = false,
  placeholderText,
  filterValue,
  onChange,
  items,
  ...listProps
}: FilteredActionListProps): JSX.Element {
  const containerRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const activeDescendantRef = useRef<HTMLElement>()
  const listId = useMemo(uniqueId, [])
  const onInputKeyPress: KeyboardEventHandler = useCallback(
    event => {
      if (event.key === 'Enter' && activeDescendantRef.current) {
        event.preventDefault()
        event.nativeEvent.stopImmediatePropagation()

        // Forward Enter key press to active descendant so that item gets activated
        const activeDescendantEvent = new KeyboardEvent(event.type, event.nativeEvent)
        activeDescendantRef.current?.dispatchEvent(activeDescendantEvent)
      }
    },
    [activeDescendantRef]
  )

  useFocusZone({
    containerRef,
    focusOutBehavior: 'wrap',
    focusableElementFilter: element => {
      if (element instanceof HTMLInputElement) {
        // No active-descendant focus on checkboxes in list items or filter input
        return false
      }
      return true
    },
    activeDescendantFocus: inputRef,
    onActiveDescendantChanged: (current, previous) => {
      activeDescendantRef.current = current

      if (previous) {
        previous.classList.remove(itemActiveDescendantClass)
      }

      if (current) {
        current.classList.add(itemActiveDescendantClass)
      }
    }
  })

  return (
    <Box ref={containerRef} flexGrow={1} flexDirection="column">
      <TextInput
        ref={inputRef}
        block
        width="auto"
        color="text.primary"
        defaultValue={filterValue}
        onChange={onChange}
        onKeyPress={onInputKeyPress}
        placeholder={placeholderText}
        aria-label={placeholderText}
        aria-controls={listId}
        mx={2}
        my={2}
        contrast
      />
      <Box flexGrow={1} overflow="auto">
        {loading ? (
          <SelectMenu.LoadingAnimation />
        ) : (
          <ActionList items={items} {...listProps} role="listbox" id={listId} />
        )}
      </Box>
    </Box>
  )
}

FilteredActionList.displayName = 'FilteredActionList'
