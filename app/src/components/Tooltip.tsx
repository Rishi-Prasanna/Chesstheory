// Floating UI Component
import { useRef, useState } from 'react'
import type {ReactNode} from 'react'
import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
  useInteractions,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  arrow,
  FloatingArrow,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react'
import type {ReferenceType} from '@floating-ui/react'

export interface RenderOpenerProps extends Record<string, unknown> {
  ref: (node: ReferenceType | null) => void
}

interface Props {
  name?: string,
  renderOpener: (props: RenderOpenerProps) => ReactNode,
}

export function Tooltip({name, renderOpener}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);
 
  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    middleware: [
      offset(12),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {move: false});
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    // If your reference element has its own label (text).
    role: 'tooltip',
  });

  // Merge all the interactions into prop getters
  const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      {renderOpener({ ref: setReference, ...getReferenceProps() })}
      {isOpen && (
        <FloatingPortal>
          <div
            className="Tooltip"
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {name}
            <FloatingArrow ref={arrowRef} context={context} />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}