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
import TextDiff from './pages/TextDiff'
import ColorTool from './pages/ColorTool'
import UuidGenerator from './pages/UuidGenerator'
import LoremGenerator from './pages/LoremGenerator'
import RegexTester from './pages/RegexTester'
import ImageResizer from './pages/ImageResizer'
import MarkdownPreview from './pages/MarkdownPreview'
import MetaTagGenerator from './pages/MetaTagGenerator'
import BmiCalculator from './pages/BmiCalculator'
import PercentageCalculator from './pages/PercentageCalculator'
import TipCalculator from './pages/TipCalculator'
import AgeCalculator from './pages/AgeCalculator'
import NumberBaseConverter from './pages/NumberBaseConverter'
import TextEncryptor from './pages/TextEncryptor'
import TextToSpeech from './pages/TextToSpeech'
import SlugGenerator from './pages/SlugGenerator'

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
            <Route path="/text-diff" element={<TextDiff />} />
            <Route path="/color-tool" element={<ColorTool />} />
            <Route path="/uuid-generator" element={<UuidGenerator />} />
            <Route path="/lorem-generator" element={<LoremGenerator />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/image-resize" element={<ImageResizer />} />
            <Route path="/markdown-preview" element={<MarkdownPreview />} />
            <Route path="/meta-tag-generator" element={<MetaTagGenerator />} />
            <Route path="/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/tip-calculator" element={<TipCalculator />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/number-base-converter" element={<NumberBaseConverter />} />
            <Route path="/text-encryptor" element={<TextEncryptor />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/slug-generator" element={<SlugGenerator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
