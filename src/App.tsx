import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/ToastProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Merge from './pages/Merge'
import Split from './pages/Split'
import Compress from './pages/Compress'
import Rotate from './pages/Rotate'
import Watermark from './pages/Watermark'
import Protect from './pages/Protect'
import Metadata from './pages/Metadata'
import Reorder from './pages/Reorder'
import PdfToImage from './pages/PdfToImage'
import ImageToPdf from './pages/ImageToPdf'
import ImageCompress from './pages/ImageCompress'
import QrGenerator from './pages/QrGenerator'
import WordCounter from './pages/WordCounter'
import TypeMaster from './pages/TypeMaster'
import ComparePdf from './pages/ComparePdf'
import SignPdf from './pages/SignPdf'
import FillForm from './pages/FillForm'
import ExtractText from './pages/ExtractText'
import CropPdf from './pages/CropPdf'
import PasswordTool from './pages/PasswordTool'
import JsonFormatter from './pages/JsonFormatter'
import UnitConverter from './pages/UnitConverter'
import AddPageNumbers from './pages/AddPageNumbers'
import TextToPdf from './pages/TextToPdf'
import Base64Tool from './pages/Base64Tool'
import UrlEncoder from './pages/UrlEncoder'
import CaseConverter from './pages/CaseConverter'
import HashGenerator from './pages/HashGenerator'
import TimestampConverter from './pages/TimestampConverter'
import CsvJsonConverter from './pages/CsvJsonConverter'

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/merge" element={<Merge />} />
            <Route path="/split" element={<Split />} />
            <Route path="/compress" element={<Compress />} />
            <Route path="/rotate" element={<Rotate />} />
            <Route path="/watermark" element={<Watermark />} />
            <Route path="/protect" element={<Protect />} />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/reorder" element={<Reorder />} />
            <Route path="/pdf-to-image" element={<PdfToImage />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/image-compress" element={<ImageCompress />} />
            <Route path="/qr-generator" element={<QrGenerator />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/type-master" element={<TypeMaster />} />
            <Route path="/compare-pdf" element={<ComparePdf />} />
            <Route path="/sign-pdf" element={<SignPdf />} />
            <Route path="/fill-form" element={<FillForm />} />
            <Route path="/extract-text" element={<ExtractText />} />
            <Route path="/crop-pdf" element={<CropPdf />} />
            <Route path="/password-tool" element={<PasswordTool />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/add-page-numbers" element={<AddPageNumbers />} />
            <Route path="/text-to-pdf" element={<TextToPdf />} />
            <Route path="/base64-tool" element={<Base64Tool />} />
            <Route path="/url-encoder" element={<UrlEncoder />} />
            <Route path="/case-converter" element={<CaseConverter />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/timestamp-converter" element={<TimestampConverter />} />
            <Route path="/csv-json-converter" element={<CsvJsonConverter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
