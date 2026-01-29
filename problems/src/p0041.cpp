#include <iostream>

int main()
{
    std::cout << "Number: ";

    int x{};
    char ch{ '?' };
    int y{ -1 };

    std::cin >> x >> ch >> y;

    std::cout << x << ' ' << ch << ' ' << y << '\n';
    return 0;
}
