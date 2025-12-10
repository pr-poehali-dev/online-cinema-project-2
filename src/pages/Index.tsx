import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'catalog' | 'favorites' | 'profile';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface Subscription {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Все');

  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: 'Межзвёздный', year: 2014, rating: 8.6, genre: 'Фантастика', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400', isFavorite: false },
    { id: 2, title: 'Начало', year: 2010, rating: 8.8, genre: 'Триллер', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400', isFavorite: true },
    { id: 3, title: 'Матрица', year: 1999, rating: 8.7, genre: 'Фантастика', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400', isFavorite: false },
    { id: 4, title: 'Побег из Шоушенка', year: 1994, rating: 9.3, genre: 'Драма', imageUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400', isFavorite: true },
    { id: 5, title: 'Тёмный рыцарь', year: 2008, rating: 9.0, genre: 'Боевик', imageUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400', isFavorite: false },
    { id: 6, title: 'Форрест Гамп', year: 1994, rating: 8.8, genre: 'Драма', imageUrl: 'https://images.unsplash.com/photo-1574267432644-f410f8ec4f82?w=400', isFavorite: false },
    { id: 7, title: 'Властелин колец', year: 2001, rating: 8.8, genre: 'Фэнтези', imageUrl: 'https://images.unsplash.com/photo-1618945524163-32451704a2ea?w=400', isFavorite: true },
    { id: 8, title: 'Криминальное чтиво', year: 1994, rating: 8.9, genre: 'Криминал', imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400', isFavorite: false },
  ]);

  const genres = ['Все', 'Фантастика', 'Драма', 'Боевик', 'Триллер', 'Криминал', 'Фэнтези'];

  const subscriptions: Subscription[] = [
    {
      name: 'Базовая',
      price: '199 ₽/мес',
      features: ['HD качество', 'Реклама', '1 устройство', 'Доступ к базовой библиотеке']
    },
    {
      name: 'Стандарт',
      price: '399 ₽/мес',
      features: ['Full HD качество', 'Без рекламы', '2 устройства', 'Расширенная библиотека'],
      isPopular: true
    },
    {
      name: 'Премиум',
      price: '599 ₽/мес',
      features: ['4K Ultra HD', 'Без рекламы', '4 устройства', 'Вся библиотека', 'Ранний доступ']
    }
  ];

  const toggleFavorite = (id: number) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    ));
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const favoriteMovies = movies.filter(movie => movie.isFavorite);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Film" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CineMax
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Home" size={20} />
              <span>Главная</span>
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 transition-colors ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Grid3x3" size={20} />
              <span>Каталог</span>
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 transition-colors ${activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Heart" size={20} />
              <span>Избранное</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="User" size={20} />
              <span>Профиль</span>
            </button>
          </div>

          <Button size="sm" className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Войти
          </Button>

          <button className="md:hidden">
            <Icon name="Menu" size={24} />
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200)',
                  filter: 'brightness(0.3)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-scale-in">
                  Смотри лучшее <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    кино онлайн
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Тысячи фильмов и сериалов в HD и 4K качестве
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать просмотр
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Info" size={20} className="mr-2" />
                    Подробнее
                  </Button>
                </div>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Популярное сейчас</h2>
                <Button variant="ghost" onClick={() => setActiveTab('catalog')}>
                  Смотреть всё <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {movies.slice(0, 8).map((movie, index) => (
                  <Card 
                    key={movie.id} 
                    className="group overflow-hidden border-0 bg-card hover:scale-105 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(movie.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      >
                        <Icon 
                          name="Heart" 
                          size={20} 
                          className={movie.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                        />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary">
                          <Icon name="Play" size={16} className="mr-2" />
                          Смотреть
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 truncate">{movie.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{movie.year}</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Каталог фильмов</h1>
            
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск фильмов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card border-0"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {genres.map(genre => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                    className={selectedGenre === genre ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <Card 
                  key={movie.id} 
                  className="group overflow-hidden border-0 bg-card hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img 
                      src={movie.imageUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/70 backdrop-blur-sm">{movie.genre}</Badge>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie.id);
                      }}
                      className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <Icon 
                        name="Heart" 
                        size={20} 
                        className={movie.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{movie.year}</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Избранное</h1>
            
            {favoriteMovies.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">У вас пока нет избранных фильмов</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {favoriteMovies.map((movie) => (
                  <Card 
                    key={movie.id} 
                    className="group overflow-hidden border-0 bg-card hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(movie.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <Icon name="Heart" size={20} className="fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 truncate">{movie.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{movie.year}</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Мой профиль</h1>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 bg-card border-0">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name="User" size={48} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Иван Иванов</h3>
                  <p className="text-muted-foreground mb-4">ivan@example.com</p>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">Стандарт подписка</Badge>
                </div>
              </Card>

              <Card className="p-6 bg-card border-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name="Film" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-sm text-muted-foreground">Просмотрено</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Icon name="Heart" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{favoriteMovies.length}</p>
                    <p className="text-sm text-muted-foreground">В избранном</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Подписка до</p>
                    <p className="text-lg font-semibold">15.01.2025</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Продлить подписку
                </Button>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Тарифные планы</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {subscriptions.map((sub) => (
                  <Card 
                    key={sub.name}
                    className={`p-6 border-2 transition-all hover:scale-105 ${
                      sub.isPopular 
                        ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10' 
                        : 'border-border bg-card'
                    }`}
                  >
                    {sub.isPopular && (
                      <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">
                        Популярный
                      </Badge>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{sub.name}</h3>
                    <p className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {sub.price}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {sub.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        sub.isPopular 
                          ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                          : ''
                      }`}
                      variant={sub.isPopular ? 'default' : 'outline'}
                    >
                      Выбрать план
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="flex justify-around p-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs">Главная</span>
          </button>
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="Grid3x3" size={24} />
            <span className="text-xs">Каталог</span>
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="Heart" size={24} />
            <span className="text-xs">Избранное</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;