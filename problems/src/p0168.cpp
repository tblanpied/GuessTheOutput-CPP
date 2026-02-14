#include <iostream>

int main()
{
    std::cout << "Data: ";

    char x{};
    char y{};

    std::cin >> x;
    std::cin >> y;

    std::cout << '[' << x << "]\n";
    std::cout << '[' << y << "]\n";

    return 0;
}
