import { useEffect, useMemo, useState } from 'react'
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './App.css'

const initialProducts = [
  {
    id: 1,
    title: 'New Era 59FIFTY MLB Yankees',
    description: 'Gorra negra de los New York Yankees con visera plana y estructura rígida.',
    price: 24.99,
    color: 'thumbnail-sky',
    capColor: '#111111',
    images: {
      front: '/gorra-yankees-front.png',
      side: '/gorra-yankees-side.png',
      back: '/gorra-yankees-back.png',
      inside: '/gorra-yankees-inside.png',
    },
    features: [
      'Ajuste fitted en tallas completas',
      'Estructura rígida para mayor durabilidad',
      'Visera plana de estilo clásico',
      'Ojales de ventilación para mayor frescura',
    ],
    availableSizes: ['6 7/8', '7', '7 1/8', '7 1/4', '7 3/8', '7 1/2', '7 5/8', '7 3/4'],
  },
  {
    id: 2,
    title: 'New Era 59FIFTY MLB LA Dodgers',
    description: 'Gorra negra de Los Angeles Dodgers con visera plana y estructura fitted.',
    price: 22.5,
    color: 'thumbnail-lilac',
    capColor: '#111111',
    images: {
      front: '/gorra-dodgers-front.png',
      side: '/gorra-dodgers-side.png',
      back: '/gorra-dodgers-back.png',
      inside: '/gorra-dodgers-inside.png',
    },
    features: [
      'Ajuste fitted en tallas completas',
      'Estructura rígida para mayor durabilidad',
      'Visera plana de estilo clásico',
      'Ojales de ventilación para mayor frescura',
    ],
    availableSizes: ['6 7/8', '7', '7 1/8', '7 1/4', '7 3/8', '7 1/2', '7 5/8', '7 3/4'],
  },
  {
    id: 3,
    title: 'Gorra deportiva negra',
    description: 'Ligera y transpirable, perfecta para acompañarte en movimiento.',
    price: 26,
    color: 'thumbnail-sand',
    capColor: '#111111',
  },
  {
    id: 4,
    title: 'Gorra trucker negra',
    description: 'Estilo trucker con paneles posteriores ventilados y cierre ajustable.',
    price: 28,
    color: 'thumbnail-blue',
    capColor: '#111111',
  },
  {
    id: 5,
    title: 'Gorra clásica carbón',
    description: 'Un color intenso y un diseño atemporal para darle personalidad a tu look.',
    price: 24.99,
    color: 'thumbnail-rose',
    capColor: '#1f1f1f',
  },
  {
    id: 6,
    title: 'Gorra premium negra',
    description: 'Acabado suave, visera curva y un ajuste cómodo para uso diario.',
    price: 32,
    color: 'thumbnail-green',
    capColor: '#111111',
  },
]

function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function submitSearch(event) {
    event.preventDefault()
    setMenuOpen(false)
    navigate('/products')
  }

  return (
    <header className="navbar">
      <Link className="navbar-brand" to="/">Gorras</Link>
      <nav className="nav-links" aria-label="Navegación principal">
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/" end>
          Inicio
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/products">
          Gorras
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/props">
          Props
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/rick-and-morty">
          Rick and Morty
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/login">
          Iniciar sesión
        </NavLink>
        <div className="menu-wrap">
          <button
            className={`nav-link menu-trigger${menuOpen ? ' menu-trigger-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menú <span className="menu-caret" aria-hidden="true">▾</span>
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <Link to="/products" onClick={() => setMenuOpen(false)}>Ver gorras</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>Sobre la tienda</Link>
            </div>
          )}
        </div>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/about">
          La tienda
        </NavLink>
      </nav>
      <form className="search-form" role="search" onSubmit={submitSearch}>
        <label className="visually-hidden" htmlFor="product-search">Buscar gorras</label>
        <input
          id="product-search"
          type="search"
          placeholder="Buscar gorras"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit" aria-label="Buscar gorras">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path d="m15.5 15.5 4 4" />
          </svg>
        </button>
      </form>
    </header>
  )
}

function CapIllustration({ product }) {
  const view = product.view ?? 'front'
  const viewLabel = product.viewLabel ?? 'Vista frontal'

  return (
    <svg className={`cap-illustration cap-view-${view}`} viewBox="0 0 180 130" role="img" aria-label={`${viewLabel} de ${product.title}`}>
      {view === 'side' && (
        <>
          <path d="M35 78c4-31 25-52 54-52 26 0 43 19 46 48l-14 12H55L35 78Z" fill={product.capColor} />
          <path d="M42 77c30 1 59-5 89-14 12-4 20-1 20 5 0 13-28 22-64 22H55L42 77Z" fill={product.capColor} />
          <path d="M91 30c-2 17-3 31-2 45M64 37c-8 10-12 23-13 38m59-38c7 9 10 20 11 31" fill="none" stroke="white" strokeOpacity=".24" strokeWidth="2" />
          <path d="m132 63 8-4v13l-8 4Z" fill="white" fillOpacity=".8" />
        </>
      )}
      {view === 'back' && (
        <>
          <path d="M43 79c1-33 20-54 47-54s46 21 47 54l-13 12H56L43 79Z" fill={product.capColor} />
          <path d="M45 78c25 10 65 10 90 0l-7 14H57l-12-14Z" fill={product.capColor} />
          <path d="M72 89c0-13 8-20 18-20s18 7 18 20" fill="#f5f5f5" stroke={product.capColor} strokeWidth="4" />
          <path d="M90 27v39M66 35c-8 11-12 23-12 39m60-39c8 11 12 23 12 39" fill="none" stroke="white" strokeOpacity=".2" strokeWidth="2" />
        </>
      )}
      {view === 'inside' && (
        <>
          <ellipse cx="90" cy="67" rx="61" ry="43" fill={product.capColor} />
          <ellipse cx="90" cy="67" rx="43" ry="28" fill="#e4e4e4" />
          <ellipse cx="90" cy="67" rx="33" ry="20" fill="#f5f5f5" />
          <path d="M90 26v21M49 43l22 16m60-16-22 16M37 67h20m86 0h-20M49 91l22-14m60 14-22-14" fill="none" stroke={product.capColor} strokeOpacity=".48" strokeWidth="3" />
          <path d="M34 89c14 17 36 25 56 25s42-8 56-25" fill="none" stroke={product.capColor} strokeWidth="7" />
        </>
      )}
      {view === 'front' && (
        <>
          <path d="M43 77c2-32 20-52 47-52s45 20 47 52l-14 13H57L43 77Z" fill={product.capColor} />
          <path d="M43 76c14 4 29 6 47 6s33-2 47-6c-3 11-21 19-47 19S46 87 43 76Z" fill={product.capColor} />
          <path d="M48 80c22 8 62 8 84 0-4 14-22 24-43 24S52 94 48 80Z" fill={product.capColor} />
          <path d="M90 28v48M67 35c-8 10-12 23-12 39m58-39c8 10 12 23 12 39" fill="none" stroke="white" strokeOpacity=".24" strokeWidth="2" />
          <path d="M76 53h28v20H76z" rx="4" fill="white" fillOpacity=".9" />
          <path d="m82 68 5-10 5 10m0-10 5 10" fill="none" stroke={product.capColor} strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className={`thumbnail ${product.color}`}>
        {product.images ? (
          <img className="product-photo" src={product.images.front} alt={product.title} />
        ) : (
          <CapIllustration product={product} />
        )}
      </div>
      <div className="card-body">
        <h2 className="product-title">{product.title}</h2>
        <p className="card-description">{product.description}</p>
        <div className="card-meta">
          <strong className="product-price">${product.price.toFixed(2)}</strong>
          <div className="card-actions">
            <Link className="card-action" to={`/products/${product.id}`}>Ver gorra</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function ProductGrid({ products, search }) {
  if (products.length === 0) {
    return (
      <p className="empty-results">
        No encontramos gorras que coincidan con «{search}». Prueba otra búsqueda.
      </p>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function HomePage({ products, search }) {
  return (
    <>
      <section className="hero">
        <h1>Encuentra tu próxima gorra favorita</h1>
        <p>
          Diseños para todos los días, desde clásicos atemporales hasta estilos urbanos.
          Elige la que va contigo.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/products">Ver colección</Link>
          <Link className="button button-secondary" to="/about">Sobre la tienda</Link>
        </div>
      </section>
      <section className="product-section" aria-label="Colección de gorras">
        <div className="route-heading">
          <h2>Gorras destacadas</h2>
          <p>Estilos seleccionados para completar tu look.</p>
        </div>
        <ProductGrid products={products} search={search} />
      </section>
    </>
  )
}

function ProductsPage({ products, search }) {
  return (
    <section className="product-section route-section" aria-labelledby="products-title">
      <div className="route-heading">
        <h1 id="products-title">Todas las gorras</h1>
        <p>{products.length} {products.length === 1 ? 'estilo disponible' : 'estilos disponibles'} · Productos y precios de demostración</p>
      </div>
      <ProductGrid products={products} search={search} />
    </section>
  )
}

const productViews = [
  { id: 'front', label: 'Vista frontal' },
  { id: 'side', label: 'Vista lateral' },
  { id: 'back', label: 'Vista trasera' },
  { id: 'inside', label: 'Vista interior' },
]

const defaultCapColors = [{ name: 'Negro', value: '#111111' }]

const defaultCapSizes = ['S/M', 'M/L', 'L/XL']

function ProductDetailPage({ products }) {
  const { productId } = useParams()
  const product = products.find((item) => item.id === Number(productId))

  if (!product) {
    return (
      <section className="info-page">
        <h1>No encontramos esa gorra</h1>
        <p>Es posible que ya no esté disponible o que la dirección sea incorrecta.</p>
        <Link className="button button-primary" to="/products">Volver a la tienda</Link>
      </section>
    )
  }

  return <ProductDetailContent key={product.id} product={product} />
}

function ProductDetailContent({ product }) {
  const [selectedView, setSelectedView] = useState('front')
  const [selectedColor, setSelectedColor] = useState(product.capColor)
  const availableColors = product.colorOptions ?? defaultCapColors
  const availableSizes = product.availableSizes ?? defaultCapSizes
  const features = product.features ?? [
    'Ajuste regulable para mayor comodidad',
    'Estructura ligera para uso diario',
    'Visera curva y acabado cuidado',
    'Paneles transpirables',
  ]
  const [selectedSize, setSelectedSize] = useState(availableSizes[Math.floor(availableSizes.length / 2)])
  const displayedProduct = { ...product, capColor: selectedColor }
  const view = productViews.find((item) => item.id === selectedView)

  return (
    <section className="detail-page">
      <Link className="back-link" to="/products">← Volver a las gorras</Link>
      <div className="product-gallery">
        <div className="detail-thumbnail">
          {product.images ? (
            <img className="detail-reference-image" src={product.images[selectedView]} alt={`${view.label} de ${product.title}`} />
          ) : (
            <>
              <span className="gallery-label">{view.label}</span>
              <CapIllustration product={{ ...displayedProduct, view: selectedView, viewLabel: view.label }} />
            </>
          )}
        </div>
        <div className="product-view-list" aria-label="Vistas del producto">
          {productViews.map((productView) => (
            <button
              className={`product-view-button${selectedView === productView.id ? ' selected' : ''}`}
              type="button"
              key={productView.id}
              aria-label={productView.label}
              aria-pressed={selectedView === productView.id}
              onClick={() => setSelectedView(productView.id)}
            >
              {product.images ? (
                <img className="product-view-photo" src={product.images[productView.id]} alt="" />
              ) : (
                <CapIllustration product={{ ...displayedProduct, view: productView.id, viewLabel: productView.label }} />
              )}
              <span>{productView.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="detail-copy">
        <p className="detail-eyebrow">GORRAS · COLECCIÓN CLÁSICA</p>
        <h1>{product.title}</h1>
        <strong className="detail-price">${product.price.toFixed(2)}</strong>
        <p className="detail-description">{product.description}</p>
        <ul className="product-features">
          {features.map((feature) => (
            <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
          ))}
        </ul>
        <div className="product-options">
          <div className="option-heading">
            <span>Color</span>
            <strong>{availableColors.find((color) => color.value === selectedColor)?.name ?? 'Personalizado'}</strong>
          </div>
          <div className="color-options" aria-label="Colores disponibles">
            {availableColors.map((color) => (
              <button
                className={`color-option${selectedColor === color.value ? ' selected' : ''}`}
                style={{ '--swatch-color': color.value }}
                type="button"
                key={color.value}
                aria-label={color.name}
                aria-pressed={selectedColor === color.value}
                onClick={() => setSelectedColor(color.value)}
              />
            ))}
          </div>
        </div>
        <div className="product-options">
          <div className="option-heading">
            <span>Talla</span>
            <strong>{selectedSize}</strong>
          </div>
          <div className="size-options" aria-label="Tallas disponibles">
            {availableSizes.map((size) => (
              <button
                className={`size-option${selectedSize === size ? ' selected' : ''}`}
                type="button"
                key={size}
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <Link className="button button-primary buy-button" to="/login">Iniciar sesión para comprar</Link>
        <p className="store-note">Producto de demostración: precios, colores y disponibilidad sujetos a confirmación.</p>
      </div>
    </section>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function submitLogin(event) {
    event.preventDefault()
    setMessage('Tus datos son válidos. Conecta un servicio de autenticación para habilitar el inicio de sesión.')
  }

  return (
    <section className="info-page login-page">
      <h1>Iniciar sesión</h1>
      <p>Introduce tus datos para continuar.</p>
      <form className="login-form" onSubmit={submitLogin}>
        <label htmlFor="login-email">Correo electrónico</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="login-password">Contraseña</label>
        <input id="login-password" type="password" autoComplete="current-password" required minLength={6} />
        <button className="button button-primary" type="submit">Entrar</button>
      </form>
      {message && <p className="form-message" role="status">{message}</p>}
      <nav className="auth-links" aria-label="Opciones de cuenta">
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        <Link to="/register">Crear una cuenta</Link>
      </nav>
    </section>
  )
}

function RegisterPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  function submitRegistration(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (formData.get('password') !== formData.get('confirm-password')) {
      setError(true)
      setMessage('Las contraseñas no coinciden.')
      return
    }

    setError(false)
    setMessage('Tus datos son válidos. Conecta un servicio de autenticación para crear la cuenta.')
  }

  return (
    <section className="info-page login-page">
      <h1>Crear una cuenta</h1>
      <p>Crea una cuenta para continuar con tus compras.</p>
      <form className="login-form" onSubmit={submitRegistration}>
        <label htmlFor="register-name">Nombre</label>
        <input id="register-name" name="name" type="text" autoComplete="name" required />
        <label htmlFor="register-email">Correo electrónico</label>
        <input id="register-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="register-password">Contraseña</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
        />
        <label htmlFor="confirm-password">Confirmar contraseña</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
        />
        <button className="button button-primary" type="submit">Crear cuenta</button>
      </form>
      {message && <p className={`form-message${error ? ' form-message-error' : ''}`} role={error ? 'alert' : 'status'}>{message}</p>}
      <nav className="auth-links" aria-label="Opciones de cuenta">
        <Link to="/login">Ya tengo una cuenta</Link>
      </nav>
    </section>
  )
}

function ForgotPasswordPage() {
  const [message, setMessage] = useState('')

  function submitRecovery(event) {
    event.preventDefault()
    setMessage('Solicitud validada. Conecta un servicio de autenticación para enviar el correo de recuperación.')
  }

  return (
    <section className="info-page login-page">
      <h1>Recuperar contraseña</h1>
      <p>Escribe el correo asociado a tu cuenta para solicitar instrucciones de recuperación.</p>
      <form className="login-form" onSubmit={submitRecovery}>
        <label htmlFor="recovery-email">Correo electrónico</label>
        <input
          id="recovery-email"
          type="email"
          autoComplete="email"
          required
        />
        <button className="button button-primary" type="submit">Solicitar recuperación</button>
      </form>
      {message && <p className="form-message" role="status">{message}</p>}
      <nav className="auth-links" aria-label="Opciones de cuenta">
        <Link to="/login">Volver a iniciar sesión</Link>
        <Link to="/register">Crear una cuenta</Link>
      </nav>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="info-page">
      <h1>Sobre la tienda</h1>
      <p>Encuentra gorras clásicas, deportivas y urbanas para darle tu toque personal a cada día.</p>
      <p>Este catálogo es una demostración. Para vender productos reales todavía hace falta configurar inventario, envíos y pagos.</p>
      <Link className="button button-primary" to="/products">Ver las gorras</Link>
    </section>
  )
}

function AvatarCard({ name, initials, accent, image }) {
  return (
    <article className="avatar-card">
      <div className="avatar-figure" style={{ '--avatar-accent': accent }}>
        {image ? (
          <img className="avatar-image" src={image} alt={name} />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
      </div>
      <h3>{name}</h3>
    </article>
  )
}

function PropsPage() {
  const people = [
    { name: 'Katsuo Surahashi', initials: 'KS', accent: '#d8d0c8', image: '/avatars/perfil-1.png' },
    { name: 'Akili Lemma', initials: 'AL', accent: '#cfcfcf', image: '/avatars/perfil-2.jpg' },
    { name: 'Lin Lanying', initials: 'LL', accent: '#d9d2c7', image: '/avatars/perfil-1.png' },
  ]

  return (
    <section className="props-page">
      <div className="props-intro">
        <h1>Props React</h1>
        <p>
          Este componente demuestra el uso de props en React. Cada Avatar recibe datos desde el
          componente padre, permitiéndole reutilizar información.
        </p>
      </div>

      <div className="props-grid" aria-label="Lista de personas con props">
        {people.map((person) => (
          <AvatarCard
            key={person.name}
            name={person.name}
            initials={person.initials}
            accent={person.accent}
            image={person.image}
          />
        ))}
      </div>

      <p className="props-footer">By Jose David Marin Desarrollador</p>
    </section>
  )
}

function RickAndMortyPage() {
  const [characters, setCharacters] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const fetchCharacters = async () => {
      setLoading(true)
      setError('')

      try {
        const url = query.trim()
          ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query.trim())}`
          : 'https://rickandmortyapi.com/api/character'

        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('No se encontraron personajes con ese nombre.')
        }

        const data = await response.json()
        setCharacters(data.results ?? [])
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setCharacters([])
          setError(fetchError.message || 'No se pudieron cargar los personajes.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCharacters()

    return () => controller.abort()
  }, [query])

  return (
    <section className="rick-page">
      <div className="rick-header">
        <h1>Rick and Morty</h1>
        <p>Busca a tus personajes favoritos del universo de Rick and Morty.</p>
      </div>

      <div className="rick-search-wrap">
        <input
          className="rick-search"
          type="search"
          placeholder="Buscar personaje..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Buscar personajes de Rick and Morty"
        />
      </div>

      {loading ? (
        <div className="rick-status">Cargando personajes...</div>
      ) : error ? (
        <div className="rick-status error">{error}</div>
      ) : characters.length === 0 ? (
        <div className="rick-status">No hay resultados para esta búsqueda.</div>
      ) : (
        <div className="rick-grid">
          {characters.map((character) => (
            <article className="rick-card" key={character.id}>
              <img src={character.image} alt={character.name} />
              <div className="rick-card-body">
                <h2>{character.name}</h2>
                <p>
                  <span className={`status-dot ${character.status.toLowerCase()}`}></span>
                  {character.status} - {character.species}
                </p>
                <p>
                  <strong>Origen:</strong> {character.origin.name}
                </p>
                <p>
                  <strong>Ubicación:</strong> {character.location.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="info-page">
      <h1>No se encontró la página</h1>
      <p>La página que buscas no existe.</p>
      <Link className="button button-primary" to="/">Ir al inicio</Link>
    </section>
  )
}

function App() {
  const products = initialProducts
  const [search, setSearch] = useState('')

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products

    return products.filter((product) =>
      `${product.title} ${product.description}`.toLowerCase().includes(query),
    )
  }, [products, search])

  return (
    <main className="store-page">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={<HomePage products={visibleProducts} search={search} />}
        />
        <Route
          path="/products"
          element={<ProductsPage products={visibleProducts} search={search} />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetailPage products={products} />}
        />
        <Route path="/albums" element={<Navigate to="/products" replace />} />
        <Route path="/albums/:productId" element={<Navigate to="/products" replace />} />
        <Route path="/props" element={<PropsPage />} />
        <Route path="/rick-and-morty" element={<RickAndMortyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer className="page-footer">
        <p>Gorras · Encuentra el estilo que va contigo.</p>
        <Link to="/">Volver arriba ↑</Link>
      </footer>
    </main>
  )
}

export default App
