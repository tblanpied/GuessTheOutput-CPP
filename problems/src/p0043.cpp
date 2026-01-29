#include <iostream>

int main()
{
    std::cout << "Enter: ";

    int n{};
    char c{ '?' };

    std::cin >> n;
    std::cin >> c;

    std::cout << "n=" << n << ", c=" << c << '\n';
    return 0;
}
