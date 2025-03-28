import { enqueueSnackbar } from "notistack";

export async function handleNfcShare(shareUrl: string) {
  if ("NDEFReader" in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.write(shareUrl);
      enqueueSnackbar("NFC tag written with share URL!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      enqueueSnackbar("Failed to write NFC tag.", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  } else {
    enqueueSnackbar("NFC is not supported on this device.", {
      variant: "warning",
      autoHideDuration: 2000,
    });
  }
}

export async function handleNfcInteraction(
  setIsNfcActive: (isActive: boolean) => void,
  router: any
) {
  if ("NDEFReader" in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      setIsNfcActive(true);
      enqueueSnackbar("NFC scanning started. Please bring a Contact's phone close.", {
        variant: "info",
        autoHideDuration: 2000,
      });

      ndef.onreading = (event) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          const sharelink = decoder.decode(record.data);
          router.push(sharelink);
          enqueueSnackbar(`NFC tag read contact`, {
            variant: "success",
            autoHideDuration: 2000,
          });
        }
        setIsNfcActive(false);
      };

      ndef.onreadingerror = () => {
        enqueueSnackbar("Failed to read NFC tag. Stopping scan.", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setIsNfcActive(false);
      };
    } catch (error) {
      enqueueSnackbar(
        "NFC scanning failed or is not supported on this device.",
        { variant: "error", autoHideDuration: 2000 }
      );
      setIsNfcActive(false);
    }
  } else {
    enqueueSnackbar("NFC is not supported on this device.", {
      variant: "warning",
      autoHideDuration: 2000,
    });
  }
}
