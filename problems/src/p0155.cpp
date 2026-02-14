#include <iostream>

int main()
{
    bool a{ true };
    bool b{};
    bool c{ !b };

    std::cout << a << ' ' << b << ' ' << c << '\n';
    std::cout << std::boolalpha;
    std::cout << (!a) << ' ' << (!b) << ' ' << (!c) << '\n';
    std::cout << std::noboolalpha;
    std::cout << a << b << c << '\n';
}
