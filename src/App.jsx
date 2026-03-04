import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BackgroundColor from './pages/tools/BackgroundColor'
import LinearGradient from './pages/tools/LinearGradient'
import RadialGradient from './pages/tools/RadialGradient'
import ConicGradient from './pages/tools/ConicGradient'
import FontSize from './pages/tools/FontSize'
import TextColor from './pages/tools/TextColor'
import LineHeight from './pages/tools/LineHeight'
import LetterSpacing from './pages/tools/LetterSpacing'
import TextTransform from './pages/tools/TextTransform'
import TextAlign from './pages/tools/TextAlign'
import FontWeight from './pages/tools/FontWeight'
import TextDecoration from './pages/tools/TextDecoration'
import TextShadow from './pages/tools/TextShadow'
import TextEffects from './pages/tools/TextEffects'
import Padding from './pages/tools/Padding'
import Margin from './pages/tools/Margin'
import Border from './pages/tools/Border'
import Outline from './pages/tools/Outline'
import BorderRadius from './pages/tools/BorderRadius'
import BoxShadow from './pages/tools/BoxShadow'
import Opacity from './pages/tools/Opacity'
import { Blur, Brightness, Contrast, Grayscale, HueRotate, Invert, Saturate, Sepia } from './pages/tools/Filters'
import DropShadow from './pages/tools/DropShadow'
import BackdropFilter from './pages/tools/BackdropFilter'
import MixBlendMode from './pages/tools/MixBlendMode'
import ClipPath from './pages/tools/ClipPath'
import Flexbox from './pages/tools/Flexbox'
import Grid from './pages/tools/Grid'
import AspectRatio from './pages/tools/AspectRatio'
import ObjectFit from './pages/tools/ObjectFit'
import CSSColumns from './pages/tools/CSSColumns'
import CSSPositioning from './pages/tools/CSSPositioning'
import CSSFloat from './pages/tools/CSSFloat'
import CSSZIndex from './pages/tools/CSSZIndex'
import Rotate from './pages/tools/Rotate'
import Translate from './pages/tools/Translate'
import Skew from './pages/tools/Skew'
import Transition from './pages/tools/Transition'
import CSSAnimation from './pages/tools/CSSAnimation'
import WritingMode from './pages/tools/WritingMode'
import CSSCursor from './pages/tools/CSSCursor'
import CSSLists from './pages/tools/CSSLists'
import CSSTables from './pages/tools/CSSTables'

function AppShell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tools/background-color',  element: <BackgroundColor /> },
      { path: 'tools/linear-gradient',   element: <LinearGradient /> },
      { path: 'tools/radial-gradient',   element: <RadialGradient /> },
      { path: 'tools/conic-gradient',    element: <ConicGradient /> },
      { path: 'tools/font-size',         element: <FontSize /> },
      { path: 'tools/text-color',        element: <TextColor /> },
      { path: 'tools/line-height',       element: <LineHeight /> },
      { path: 'tools/letter-spacing',    element: <LetterSpacing /> },
      { path: 'tools/text-transform',    element: <TextTransform /> },
      { path: 'tools/text-align',        element: <TextAlign /> },
      { path: 'tools/font-weight',       element: <FontWeight /> },
      { path: 'tools/text-decoration',   element: <TextDecoration /> },
      { path: 'tools/text-shadow',       element: <TextShadow /> },
      { path: 'tools/text-effects',      element: <TextEffects /> },
      { path: 'tools/writing-mode',      element: <WritingMode /> },
      { path: 'tools/padding',           element: <Padding /> },
      { path: 'tools/margin',            element: <Margin /> },
      { path: 'tools/border',            element: <Border /> },
      { path: 'tools/outline',           element: <Outline /> },
      { path: 'tools/border-radius',     element: <BorderRadius /> },
      { path: 'tools/box-shadow',        element: <BoxShadow /> },
      { path: 'tools/opacity',           element: <Opacity /> },
      { path: 'tools/blur',              element: <Blur /> },
      { path: 'tools/brightness',        element: <Brightness /> },
      { path: 'tools/contrast',          element: <Contrast /> },
      { path: 'tools/grayscale',         element: <Grayscale /> },
      { path: 'tools/hue-rotate',        element: <HueRotate /> },
      { path: 'tools/invert',            element: <Invert /> },
      { path: 'tools/saturate',          element: <Saturate /> },
      { path: 'tools/sepia',             element: <Sepia /> },
      { path: 'tools/drop-shadow',       element: <DropShadow /> },
      { path: 'tools/backdrop-filter',   element: <BackdropFilter /> },
      { path: 'tools/mix-blend-mode',    element: <MixBlendMode /> },
      { path: 'tools/clip-path',         element: <ClipPath /> },
      { path: 'tools/flexbox',           element: <Flexbox /> },
      { path: 'tools/grid',              element: <Grid /> },
      { path: 'tools/aspect-ratio',      element: <AspectRatio /> },
      { path: 'tools/object-fit',        element: <ObjectFit /> },
      { path: 'tools/columns',           element: <CSSColumns /> },
      { path: 'tools/positioning',       element: <CSSPositioning /> },
      { path: 'tools/float',             element: <CSSFloat /> },
      { path: 'tools/z-index',           element: <CSSZIndex /> },
      { path: 'tools/rotate',            element: <Rotate /> },
      { path: 'tools/translate',         element: <Translate /> },
      { path: 'tools/skew',              element: <Skew /> },
      { path: 'tools/transition',        element: <Transition /> },
      { path: 'tools/animation',         element: <CSSAnimation /> },
      { path: 'tools/cursor',            element: <CSSCursor /> },
      { path: 'tools/lists',             element: <CSSLists /> },
      { path: 'tools/tables',            element: <CSSTables /> },
      { path: 'tools/custom-properties', element: <Navigate to="/" replace /> },
      { path: '*',                       element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
