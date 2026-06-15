import { Carousel, CarouselContext } from '@components/application/carousel/carousel-base';
import { CarouselIndicator } from '@components/application/carousel/carousel.demo';
import { Dialog, Modal, ModalOverlay } from '@components/application/modals/modal';
import { Button } from '@components/base/buttons/button';
import { CloseButton } from '@components/base/buttons/close-button';
import { Checkbox } from '@components/base/checkbox/checkbox';
import { FeaturedIcon } from '@components/foundations/featured-icon/featured-icon';
import { ArrowLeft, Trash01 } from '@untitledui/icons';
import { cx } from '@utils/cx';
import { Children, useRef, type FC, type ReactNode } from 'react';
import { Heading as AriaHeading } from 'react-aria-components';

type IconProp = FC<{ className?: string }>;

// Keeps the last value from when the modal was open, so content doesn't
// disappear mid-close-animation when the parent nulls out its state.
const useStableWhileOpen = <T,>(value: T, isOpen: boolean): T => {
  const ref = useRef(value);
  if (isOpen) ref.current = value;
  return ref.current;
};

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  cancelIcon?: IconProp | false;
  confirmIcon?: IconProp | false;
  isConfirmLoading?: boolean;
  isConfirmDisabled?: boolean;
  footer?: boolean;
  className?: string;
}

const ModalHeader = ({
  icon,
  title,
  description,
  onClose,
}: Pick<AppModalProps, 'icon' | 'title' | 'description' | 'onClose'>) => (
  <div className="relative shrink-0 px-4 py-5 sm:px-6 sm:py-6">
    <CloseButton
      onPress={onClose}
      theme="light"
      size="sm"
      className="absolute top-3 right-3 sm:top-4 sm:right-4"
    />
    <div className="flex flex-col gap-4">
      {icon && <div className="relative w-max max-sm:hidden">{icon}</div>}
      <div className="flex flex-col gap-0.5">
        <AriaHeading slot="title" className="text-md font-semibold text-primary">
          {title}
        </AriaHeading>
        {description && <p className="text-sm text-tertiary">{description}</p>}
      </div>
    </div>
  </div>
);

const AppModalBase = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  cancelIcon,
  confirmIcon,
  isConfirmLoading,
  isConfirmDisabled,
  footer = true,
  className,
}: AppModalProps) => {
  const stableTitle = useStableWhileOpen(title, isOpen);
  const stableDescription = useStableWhileOpen(description, isOpen);
  const stableIcon = useStableWhileOpen(icon, isOpen);
  const stableChildren = useStableWhileOpen(children, isOpen);

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
      <Modal className={cx('sm:min-w-100', className)}>
        <Dialog scrollContent>
          <ModalHeader
            icon={stableIcon}
            title={stableTitle}
            description={stableDescription}
            onClose={onClose}
          />

          {stableChildren && (
            <div className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6">{stableChildren}</div>
          )}

          {footer && (
            <div className="shrink-0 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
              <Button
                color="secondary"
                size="md"
                iconLeading={cancelIcon || undefined}
                onPress={onClose}
              >
                {cancelLabel}
              </Button>
              <Button
                color="primary"
                size="md"
                iconLeading={confirmIcon || undefined}
                onPress={onConfirm ?? onClose}
                isLoading={isConfirmLoading}
                isDisabled={isConfirmDisabled || isConfirmLoading}
              >
                {confirmLabel}
              </Button>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

const AppModalCarousel = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  cancelIcon,
  confirmIcon,
  isConfirmLoading,
  isConfirmDisabled,
  className,
}: AppModalProps) => {
  const stableTitle = useStableWhileOpen(title, isOpen);
  const stableDescription = useStableWhileOpen(description, isOpen);
  const stableIcon = useStableWhileOpen(icon, isOpen);
  const stableChildren = useStableWhileOpen(children, isOpen);
  const steps = Children.toArray(stableChildren);

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
      <Modal className={cx('sm:min-w-100', className)}>
        <Dialog scrollContent>
          <ModalHeader
            icon={stableIcon}
            title={stableTitle}
            description={stableDescription}
            onClose={onClose}
          />

          <Carousel.Root opts={{ watchDrag: false }} className="min-h-0 flex-1 flex flex-col">
            <div className="min-h-0 flex-1">
              <Carousel.Content>
                {steps.map((step, i) => (
                  <Carousel.Item key={i} className="overflow-y-auto px-4 sm:px-6">
                    {step}
                  </Carousel.Item>
                ))}
              </Carousel.Content>
            </div>

            {steps.length > 1 && <CarouselIndicator size="md" className="mx-auto mt-4" />}

            <CarouselContext.Consumer>
              {(context) => (
                <div className="shrink-0 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                  <Button
                    color="secondary"
                    size="md"
                    iconLeading={context?.canScrollPrev ? ArrowLeft : cancelIcon || undefined}
                    onPress={() => (context?.canScrollPrev ? context.scrollPrev() : onClose())}
                  >
                    {context?.canScrollPrev ? 'Back' : cancelLabel}
                  </Button>
                  <Button
                    color="primary"
                    size="md"
                    iconLeading={context?.canScrollNext ? undefined : confirmIcon || undefined}
                    onPress={() =>
                      context?.canScrollNext ? context.scrollNext() : (onConfirm ?? onClose)()
                    }
                    isLoading={isConfirmLoading}
                    isDisabled={
                      (!context?.canScrollNext && (isConfirmDisabled || isConfirmLoading)) ||
                      (context?.canScrollNext && isConfirmLoading)
                    }
                  >
                    {context?.canScrollNext ? 'Next' : confirmLabel}
                  </Button>
                </div>
              )}
            </CarouselContext.Consumer>
          </Carousel.Root>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

type AppModalDestructiveProps = Omit<AppModalProps, 'className'>;

const AppModalDestructive = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Delete',
  cancelIcon,
  confirmIcon,
  isConfirmLoading,
  isConfirmDisabled,
}: AppModalDestructiveProps) => {
  const stableTitle = useStableWhileOpen(title, isOpen);
  const stableDescription = useStableWhileOpen(description, isOpen);
  const stableIcon = useStableWhileOpen(icon, isOpen);
  const stableChildren = useStableWhileOpen(children, isOpen);

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
      <Modal className="sm:max-w-100">
        <Dialog>
          <CloseButton
            onPress={onClose}
            theme="light"
            size="sm"
            className="absolute top-3 right-3 sm:top-4 sm:right-4"
          />
          <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="relative w-max">
              {stableIcon ?? <FeaturedIcon color="error" size="md" theme="modern" icon={Trash01} />}
            </div>
            <div className="flex flex-col gap-0.5">
              <AriaHeading slot="title" className="text-md font-semibold text-primary">
                {stableTitle}
              </AriaHeading>
              {stableDescription && <p className="text-sm text-tertiary">{stableDescription}</p>}
            </div>
          </div>

          {stableChildren && <div className="px-4 pt-4 sm:px-6">{stableChildren}</div>}

          <div className="flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
            <Button
              color="secondary"
              size="md"
              iconLeading={cancelIcon || undefined}
              onPress={onClose}
            >
              {cancelLabel}
            </Button>
            <Button
              color="primary-destructive"
              size="md"
              iconLeading={confirmIcon || undefined}
              onPress={onConfirm ?? onClose}
              isLoading={isConfirmLoading}
              isDisabled={isConfirmDisabled || isConfirmLoading}
            >
              {confirmLabel}
            </Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

interface AppModalHorizontalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Shown only on sm+ screens instead of `description`. Useful for a longer desktop variant. */
  descriptionDesktop?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  cancelIcon?: IconProp | false;
  confirmIcon?: IconProp | false;
  isConfirmLoading?: boolean;
  isConfirmDisabled?: boolean;
  /** If provided, renders a checkbox (e.g. "Don't show again") on the left of the footer. */
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  footer?: boolean;
}

const AppModalHorizontal = ({
  isOpen,
  onClose,
  title,
  description,
  descriptionDesktop,
  icon,
  children,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  cancelIcon,
  confirmIcon,
  isConfirmLoading,
  isConfirmDisabled,
  checkboxLabel,
  checkboxChecked,
  onCheckboxChange,
  footer = true,
}: AppModalHorizontalProps) => {
  const stableTitle = useStableWhileOpen(title, isOpen);
  const stableDescription = useStableWhileOpen(description, isOpen);
  const stableDescriptionDesktop = useStableWhileOpen(descriptionDesktop, isOpen);
  const stableIcon = useStableWhileOpen(icon, isOpen);
  const stableChildren = useStableWhileOpen(children, isOpen);

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
      <Modal className="sm:max-w-136">
        <Dialog>
          <CloseButton
            onPress={onClose}
            theme="light"
            size="sm"
            className="absolute top-3 right-3 z-20 sm:top-4 sm:right-4"
          />
          <div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:px-6 sm:pt-6">
            {stableIcon && <div className="relative size-max">{stableIcon}</div>}
            <div className="relative flex flex-col gap-0.5">
              <AriaHeading slot="title" className="text-md font-semibold text-primary">
                {stableTitle}
              </AriaHeading>
              {stableDescription && (
                <p className={cx('text-sm text-tertiary', stableDescriptionDesktop && 'sm:hidden')}>
                  {stableDescription}
                </p>
              )}
              {stableDescriptionDesktop && (
                <p className="hidden text-sm text-tertiary sm:block">{stableDescriptionDesktop}</p>
              )}
            </div>
          </div>

          {stableChildren && <div className="px-4 py-4 sm:px-6">{stableChildren}</div>}

          {footer && (
            <div
              className={cx(
                'relative flex flex-1 gap-3 p-4 pt-6 sm:px-6 sm:pt-8 sm:pb-6',
                checkboxLabel
                  ? 'flex-col-reverse sm:flex-row sm:items-center'
                  : 'flex-col-reverse *:grow sm:grid sm:grid-cols-2'
              )}
            >
              {checkboxLabel && (
                <Checkbox
                  label={checkboxLabel}
                  isSelected={checkboxChecked}
                  onChange={onCheckboxChange}
                />
              )}
              <Button
                color="secondary"
                size="md"
                iconLeading={cancelIcon || undefined}
                onPress={onClose}
                className={cx(checkboxLabel && 'sm:ml-auto')}
              >
                {cancelLabel}
              </Button>
              <Button
                color="primary"
                size="md"
                iconLeading={confirmIcon || undefined}
                onPress={onConfirm ?? onClose}
                isLoading={isConfirmLoading}
                isDisabled={isConfirmDisabled || isConfirmLoading}
              >
                {confirmLabel}
              </Button>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

type AppModalHorizontalDestructiveProps = Omit<AppModalHorizontalProps, 'descriptionDesktop'>;

const AppModalHorizontalDestructive = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Delete',
  cancelIcon,
  confirmIcon,
  isConfirmLoading,
  isConfirmDisabled,
  checkboxLabel,
  checkboxChecked,
  onCheckboxChange,
  footer = true,
}: AppModalHorizontalDestructiveProps) => {
  const stableTitle = useStableWhileOpen(title, isOpen);
  const stableDescription = useStableWhileOpen(description, isOpen);
  const stableIcon = useStableWhileOpen(icon, isOpen);
  const stableChildren = useStableWhileOpen(children, isOpen);

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
      <Modal className="sm:max-w-136">
        <Dialog>
          <CloseButton
            onPress={onClose}
            theme="light"
            size="sm"
            className="absolute top-3 right-3 z-20 sm:top-4 sm:right-4"
          />
          <div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:px-6 sm:pt-6">
            <div className="relative size-max">
              {stableIcon ?? <FeaturedIcon color="error" size="md" theme="modern" icon={Trash01} />}
            </div>
            <div className="relative flex flex-col gap-0.5">
              <AriaHeading slot="title" className="text-md font-semibold text-primary">
                {stableTitle}
              </AriaHeading>
              {stableDescription && <p className="text-sm text-tertiary">{stableDescription}</p>}
            </div>
          </div>

          {stableChildren && <div className="px-4 py-4 sm:px-6">{stableChildren}</div>}

          {footer && (
            <div
              className={cx(
                'relative flex flex-1 gap-3 p-4 pt-6 sm:px-6 sm:pt-8 sm:pb-6',
                checkboxLabel
                  ? 'flex-col-reverse sm:flex-row sm:items-center'
                  : 'flex-col-reverse *:grow sm:grid sm:grid-cols-2'
              )}
            >
              {checkboxLabel && (
                <Checkbox
                  label={checkboxLabel}
                  isSelected={checkboxChecked}
                  onChange={onCheckboxChange}
                />
              )}
              <Button
                color="secondary"
                size="md"
                iconLeading={cancelIcon || undefined}
                onPress={onClose}
                className={cx(checkboxLabel && 'sm:ml-auto')}
              >
                {cancelLabel}
              </Button>
              <Button
                color="primary-destructive"
                size="md"
                iconLeading={confirmIcon || undefined}
                onPress={onConfirm ?? onClose}
                isLoading={isConfirmLoading}
                isDisabled={isConfirmDisabled || isConfirmLoading}
              >
                {confirmLabel}
              </Button>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export const AppModal = Object.assign(AppModalBase, {
  Carousel: AppModalCarousel,
  DestructiveLeftAlign: AppModalDestructive,
  Horizontal: AppModalHorizontal,
  HorizontalDestructive: AppModalHorizontalDestructive,
});
