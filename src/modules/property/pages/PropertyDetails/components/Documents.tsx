import { Box } from "@mui/material";
import { images } from "@src/utils/images";
import { useState } from "react";

// Custom document modal component
const DocumentModal = ({
  isOpen,
  document,
  onClose,
}: {
  isOpen: boolean;
  document: string;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 99999 }}>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          background: "rgba(0,0,0,0.5)",
          inset: 0,
        }}
      />

      {/* Modal content */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "800px",
          boxShadow: 24,
          p: 0,
          outline: "none",
          borderRadius: "4px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 0,
            overflow: "hidden",
            maxHeight: "calc(90vh - 60px)",
            width: "100%",
            display: "flex",

            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={document || images.doc}
            alt="Document"
            sx={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "calc(90vh - 80px)",
              objectFit: "contain",
              p: 2,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const PropertyDocuments = ({
  documents = ["", "", "", ""],
}: {
  documents: string[];
}) => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleOpenDocument = (document: string) => {
    setSelectedDocument(document);
  };

  const handleCloseDocument = () => {
    setSelectedDocument(null);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "10px",
          boxSizing: "border-box",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        {documents.map((document, index) => (
          <Box
            key={index}
            onClick={() => handleOpenDocument(document || images.doc)}
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <Box
              component="img"
              src={images.doc}
              alt={`Document ${index + 1}`}
              sx={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>

      <DocumentModal
        isOpen={!!selectedDocument}
        document={selectedDocument || ""}
        onClose={handleCloseDocument}
      />
    </>
  );
};
